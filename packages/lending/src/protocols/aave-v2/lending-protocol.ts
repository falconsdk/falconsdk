import { ATokenInterface } from './contracts/AToken';
import {
  AToken__factory,
  ETHPriceFeed,
  ETHPriceFeed__factory,
  PriceOracle,
  PriceOracle__factory,
  ProtocolDataProvider,
  ProtocolDataProvider__factory,
} from './contracts';
import { BigNumber, providers } from 'ethers';
import {
  BorrowObject,
  BorrowParams,
  Market,
  RepayParams,
  SupplyObject,
  SupplyParams,
  WithdrawParams,
} from 'src/protocol.type';
import {
  DISPLAY_NAME,
  ID,
  Reserve,
  getContractAddress,
  isBorrowEnabled,
  isSupplyEnabled,
  supportedChainIds,
} from './configs';
import { ETHPriceFeedInterface } from './contracts/ETHPriceFeed';
import { Portfolio } from 'src/protocol.portfolio';
import { PriceOracleInterface } from './contracts/PriceOracle';
import { Protocol } from 'src/protocol';
import { ProtocolDataProviderInterface } from './contracts/ProtocolDataProvider';
import { RAY_DECIMALS, SECONDS_PER_YEAR, calculateCompoundedRate, normalize } from '@aave/math-utils';
import * as apisdk from '@falcon/api';
import { calcBorrowGrossApy, calcSupplyGrossApy, getLstApyFromMap } from 'src/protocol.utils';
import * as common from '@falcon/common';
import * as logics from '@falcon/logics';

export class LendingProtocol extends Protocol {
  static readonly markets = supportedChainIds.map((chainId) => ({
    id: common.toNetworkId(chainId),
    name: common.getNetwork(chainId).name,
    chainId,
  }));

  readonly id = ID;
  readonly name = DISPLAY_NAME;
  readonly market: Market;

  private reserves: logics.aavev2.ReserveTokens[] = [];
  private reserveMap: Record<string, Reserve> = {};

  constructor(chainId: number, provider?: providers.Provider) {
    super(chainId, provider);
    this.market = LendingProtocol.markets.find((market) => market.chainId === this.chainId)!;
  }

  public static async createProtocol(chainId: number, provider?: providers.Provider): Promise<LendingProtocol> {
    const instance = new LendingProtocol(chainId, provider);

    await instance.initializeReservesConfig();

    return instance;
  }

  async initializeReservesConfig() {
    const service = new logics.aavev2.Service(this.chainId, this.provider);
    const reserves = await service.getReserveTokens();

    const reserveMap: Record<string, Reserve> = {};

    for (const { asset, aToken, stableDebtToken, variableDebtToken } of reserves) {
      if (asset.isWrapped) {
        reserveMap[asset.unwrapped.address] = { aToken, asset };
        reserves.push({ asset: asset.unwrapped, aToken, stableDebtToken, variableDebtToken });
      }

      reserveMap[asset.address] = { aToken, asset };
      reserveMap[aToken.address] = { aToken, asset };
    }

    this.reserves = reserves;
    this.reserveMap = reserveMap;
  }

  private _protocolDataProvider?: ProtocolDataProvider;

  get protocolDataProvider() {
    if (!this._protocolDataProvider) {
      this._protocolDataProvider = ProtocolDataProvider__factory.connect(
        getContractAddress(this.chainId, 'ProtocolDataProvider'),
        this.provider
      );
    }
    return this._protocolDataProvider;
  }

  private _protocolDataProviderIface?: ProtocolDataProviderInterface;

  get protocolDataProviderIface() {
    if (!this._protocolDataProviderIface) {
      this._protocolDataProviderIface = ProtocolDataProvider__factory.createInterface();
    }
    return this._protocolDataProviderIface;
  }

  private _priceOracle?: PriceOracle;

  get priceOracle() {
    if (!this._priceOracle) {
      this._priceOracle = PriceOracle__factory.connect(getContractAddress(this.chainId, 'PriceOracle'), this.provider);
    }
    return this._priceOracle;
  }

  private _priceOracleIface?: PriceOracleInterface;

  get priceOracleIface() {
    if (!this._priceOracleIface) {
      this._priceOracleIface = PriceOracle__factory.createInterface();
    }
    return this._priceOracleIface;
  }

  private _ethPriceFeed?: ETHPriceFeed;

  get ethPriceFeed() {
    if (!this._ethPriceFeed) {
      this._ethPriceFeed = ETHPriceFeed__factory.connect(
        getContractAddress(this.chainId, 'ETHPriceFeed'),
        this.provider
      );
    }
    return this._ethPriceFeed;
  }

  private _priceFeedIface?: ETHPriceFeedInterface;

  get ethPriceFeedIface() {
    if (!this._priceFeedIface) {
      this._priceFeedIface = ETHPriceFeed__factory.createInterface();
    }
    return this._priceFeedIface;
  }

  private _aTokenIface?: ATokenInterface;

  get aTokenIface() {
    if (!this._aTokenIface) {
      this._aTokenIface = AToken__factory.createInterface();
    }
    return this._aTokenIface;
  }

  private _tokensForDeposit?: common.Token[];

  async getTokensForDeposit() {
    if (!this._tokensForDeposit) {
      const tokenList = await apisdk.falconsdk.aavev2.getDepositTokenList(this.chainId);

      const tokens = tokenList.filter((tokens) => isSupplyEnabled(this.chainId, tokens[0])).map((tokens) => tokens[0]);

      this._tokensForDeposit = tokens;
    }

    return this._tokensForDeposit;
  }

  private _tokensForBorrow?: common.Token[];

  async getTokensForBorrow() {
    if (!this._tokensForBorrow) {
      const tokenList = await apisdk.falconsdk.aavev2.getBorrowTokenList(this.chainId);

      const tokens = tokenList.filter((token) => isBorrowEnabled(this.chainId, token));

      this._tokensForBorrow = tokens;
    }

    return this._tokensForBorrow;
  }

  getMarketName() {
    return this.market.id;
  }

  private _reserveDataMap?: Record<
    string,
    {
      ltv: string;
      liquidationThreshold: string;
      usageAsCollateralEnabled: boolean;
      supplyAPY: string;
      borrowAPY: string;
      totalSupply: string;
      totalBorrow: string;
    }
  >;

  async getReserveDataMap() {
    if (!this._reserveDataMap) {
      const calls: common.Multicall3.CallStruct[] = [];
      for (const { asset, aToken } of this.reserves) {
        calls.push({
          target: this.protocolDataProvider.address,
          callData: this.protocolDataProviderIface.encodeFunctionData('getReserveConfigurationData', [
            asset.wrapped.address,
          ]),
        });
        calls.push({
          target: this.protocolDataProvider.address,
          callData: this.protocolDataProviderIface.encodeFunctionData('getReserveData', [asset.wrapped.address]),
        });
        calls.push({
          target: aToken.address,
          callData: this.aTokenIface.encodeFunctionData('totalSupply'),
        });
      }
      const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

      this._reserveDataMap = {};
      let j = 0;
      for (const { asset } of this.reserves) {
        const { ltv, liquidationThreshold, usageAsCollateralEnabled } =
          this.protocolDataProviderIface.decodeFunctionResult('getReserveConfigurationData', returnData[j]);
        j++;
        const { liquidityRate, variableBorrowRate, totalVariableDebt } =
          this.protocolDataProviderIface.decodeFunctionResult('getReserveData', returnData[j]);
        j++;
        const [totalSupply] = this.aTokenIface.decodeFunctionResult('totalSupply', returnData[j]);
        j++;

        this._reserveDataMap[asset.address] = {
          ltv: common.toBigUnit(ltv, 4),
          liquidationThreshold: common.toBigUnit(liquidationThreshold, 4),
          usageAsCollateralEnabled,
          supplyAPY: normalize(
            calculateCompoundedRate({ rate: liquidityRate.toString(), duration: SECONDS_PER_YEAR }),
            RAY_DECIMALS
          ),
          borrowAPY: normalize(
            calculateCompoundedRate({ rate: variableBorrowRate.toString(), duration: SECONDS_PER_YEAR }),
            RAY_DECIMALS
          ),
          totalSupply: common.toBigUnit(totalSupply, asset.decimals),
          totalBorrow: common.toBigUnit(totalVariableDebt, asset.decimals),
        };
      }
    }

    return this._reserveDataMap;
  }

  async getAssetPriceMap() {
    const calls: common.Multicall3.CallStruct[] = [
      {
        target: this.ethPriceFeed.address,
        callData: this.ethPriceFeedIface.encodeFunctionData('latestAnswer'),
      },
      {
        target: this.priceOracle.address,
        callData: this.priceOracleIface.encodeFunctionData('getAssetsPrices', [
          this.reserves.map(({ asset }) => asset.wrapped.address),
        ]),
      },
    ];
    const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

    const [ethPrice] = this.ethPriceFeedIface.decodeFunctionResult('latestAnswer', returnData[0]);
    const [assetPrices] = this.priceOracleIface.decodeFunctionResult('getAssetsPrices', returnData[1]);

    const assetPriceMap: Record<string, string> = {};
    for (let i = 0; i < this.reserves.length; i++) {
      assetPriceMap[this.reserves[i].asset.address] = common.toBigUnit(
        ethPrice.mul(assetPrices[i]).div(BigNumber.from(10).pow(18)),
        8
      );
    }

    return assetPriceMap;
  }

  async getUserBalancesMap(account: string) {
    const calls: common.Multicall3.CallStruct[] = [];
    for (const { asset, aToken } of this.reserves) {
      calls.push({ target: aToken.address, callData: this.erc20Iface.encodeFunctionData('balanceOf', [account]) });
      calls.push({
        target: this.protocolDataProvider.address,
        callData: this.protocolDataProviderIface.encodeFunctionData('getUserReserveData', [
          asset.wrapped.address,
          account,
        ]),
      });
    }
    const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

    const userBalancesMap: Record<
      string,
      {
        supplyBalance: string;
        borrowBalance: string;
        usageAsCollateralEnabled: boolean;
      }
    > = {};
    let j = 0;
    for (let i = 0; i < this.reserves.length; i++) {
      const { asset } = this.reserves[i];

      const [aTokenBalance] = this.erc20Iface.decodeFunctionResult('balanceOf', returnData[j]);
      j++;

      const { currentVariableDebt, usageAsCollateralEnabled } = this.protocolDataProviderIface.decodeFunctionResult(
        'getUserReserveData',
        returnData[j]
      );
      j++;

      userBalancesMap[asset.address] = {
        supplyBalance: common.toBigUnit(aTokenBalance, asset.decimals),
        borrowBalance: common.toBigUnit(currentVariableDebt, asset.decimals),
        usageAsCollateralEnabled,
      };
    }

    return userBalancesMap;
  }

  // https://github.com/aave/interface/blob/release-2023-07-25_15-22/src/hooks/app-data-provider/useAppDataProvider.tsx#L228
  // https://github.com/aave/protocol-v2/blob/master/contracts/protocol/libraries/logic/GenericLogic.sol#L150
  async getPortfolios(account: string) {
    const reserveDataMap = await this.getReserveDataMap();
    const assetPriceMap = await this.getAssetPriceMap();
    const userBalancesMap = await this.getUserBalancesMap(account);
    const lstTokenAPYMap = await this.getLstTokenAPYMap(this.chainId);
    const tokensForDeposit = await this.getTokensForDeposit();
    const tokensForBorrow = await this.getTokensForBorrow();

    const supplies: SupplyObject[] = [];
    for (const token of tokensForDeposit) {
      if (token.isWrapped) continue;

      const reserveData = reserveDataMap[token.address];
      const assetPrice = assetPriceMap[token.address];
      const userBalance = userBalancesMap[token.address];

      let usageAsCollateralEnabled = reserveData.usageAsCollateralEnabled;
      if (Number(userBalance.supplyBalance) > 0) {
        usageAsCollateralEnabled = usageAsCollateralEnabled && userBalance.usageAsCollateralEnabled;
      }

      const lstApy = getLstApyFromMap(token.address, lstTokenAPYMap);
      const grossApy = calcSupplyGrossApy(reserveData.supplyAPY, lstApy);

      supplies.push({
        token,
        price: assetPrice,
        balance: userBalance.supplyBalance,
        apy: reserveData.supplyAPY,
        lstApy,
        grossApy,
        usageAsCollateralEnabled,
        ltv: reserveData.ltv,
        liquidationThreshold: reserveData.liquidationThreshold,
        totalSupply: reserveData.totalSupply,
      });
    }

    const borrows: BorrowObject[] = [];
    for (const token of tokensForBorrow) {
      if (token.isWrapped) continue;

      const { supplyAPY: apy, totalBorrow } = reserveDataMap[token.address];
      const price = assetPriceMap[token.address];
      const { borrowBalance: balance } = userBalancesMap[token.address];

      const lstApy = getLstApyFromMap(token.address, lstTokenAPYMap);
      const grossApy = calcBorrowGrossApy(apy, lstApy);

      borrows.push({
        token,
        price,
        balance,
        apy,
        lstApy,
        grossApy,
        totalBorrow,
      });
    }

    const portfolio = new Portfolio(this.chainId, this.id, this.market.id, supplies, borrows);

    return [portfolio];
  }

  async getPortfolio(account: string) {
    return this.getPortfolios(account).then((portfolios) => portfolios[0]);
  }

  toUnderlyingToken(_marketId: string, protocolToken: common.Token) {
    return this.reserveMap[protocolToken.address].asset;
  }

  toProtocolToken(_marketId: string, underlyingToken: common.Token) {
    return this.reserveMap[underlyingToken.address].aToken;
  }

  isProtocolToken(_marketId: string, token: common.Token) {
    return this.reserveMap[token.address].aToken.is(token);
  }

  newSupplyLogic({ marketId, input }: SupplyParams) {
    return apisdk.falconsdk.aavev2.newDepositLogic({
      input,
      output: new common.TokenAmount(this.toProtocolToken(marketId, input.token), input.amount),
    });
  }

  newWithdrawLogic({ marketId, output }: WithdrawParams) {
    return apisdk.falconsdk.aavev2.newWithdrawLogic({
      input: new common.TokenAmount(this.toProtocolToken(marketId, output.token), output.amount),
      output,
    });
  }

  newBorrowLogic({ output }: BorrowParams) {
    return apisdk.falconsdk.aavev2.newBorrowLogic({
      output,
      interestRateMode: logics.aavev2.InterestRateMode.variable,
    });
  }

  newRepayLogic({ input, account }: RepayParams) {
    return apisdk.falconsdk.aavev2.newRepayLogic({
      input,
      borrower: account,
      interestRateMode: logics.aavev2.InterestRateMode.variable,
    });
  }
}
