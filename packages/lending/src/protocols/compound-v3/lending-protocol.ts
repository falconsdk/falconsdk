import {
  AssetConfig,
  DISPLAY_NAME,
  ID,
  MarketInfo,
  configMap,
  getMarketConfig,
  marketMap,
  supportedChainIds,
} from './configs';
import { BigNumber, providers } from 'ethers';
import { BorrowObject, Market, RepayParams, SupplyObject, SupplyParams, WithdrawParams } from 'src/protocol.type';
import { CometInterface } from './contracts/Comet';
import { Comet__factory } from './contracts';
import { Portfolio } from 'src/protocol.portfolio';
import { Protocol } from 'src/protocol';
import * as apisdk from '@falcon/api';
import { calcAPR } from './utils';
import { calcBorrowGrossApy, calcSupplyGrossApy, getLstApyFromMap } from 'src/protocol.utils';
import * as common from '@falcon/common';

export class LendingProtocol extends Protocol {
  readonly id = ID;
  readonly name = DISPLAY_NAME;

  static readonly markets = supportedChainIds.reduce((accumulator, chainId) => {
    for (const marketId of Object.keys(marketMap[chainId])) {
      accumulator.push({ id: marketId, chainId });
    }
    return accumulator;
  }, [] as Market[]);

  public static async createProtocol(chainId: number, provider?: providers.Provider): Promise<LendingProtocol> {
    return new LendingProtocol(chainId, provider);
  }

  getMarketName(id: string) {
    return id;
  }

  override canCollateralSwap(marketId: string, assetToken: common.Token) {
    return !assetToken.wrapped.is(getMarketConfig(this.chainId, marketId).baseToken);
  }

  override canDebtSwap() {
    return false;
  }

  canLeverageByDebt = false;

  toUnderlyingToken(marketId: string) {
    const { baseToken } = getMarketConfig(this.chainId, marketId);
    return baseToken.unwrapped;
  }

  toProtocolToken(marketId: string) {
    const { comet } = getMarketConfig(this.chainId, marketId);
    return comet;
  }

  isProtocolToken(marketId: string, token: common.Token) {
    const { comet } = getMarketConfig(this.chainId, marketId);
    return token.is(comet);
  }

  override isAssetTokenized(marketId: string, assetToken: common.Token) {
    return assetToken.wrapped.is(getMarketConfig(this.chainId, marketId).baseToken);
  }

  private _cometIface?: CometInterface;

  get cometIface() {
    if (!this._cometIface) {
      this._cometIface = Comet__factory.createInterface();
    }
    return this._cometIface;
  }

  private _marketMap = supportedChainIds.reduce((accumulator, chainId) => {
    accumulator[chainId] = {};
    return accumulator;
  }, {} as Record<number, Record<string, MarketInfo>>);

  async getMarket(id: string) {
    if (!this._marketMap[this.chainId][id]) {
      const market = getMarketConfig(this.chainId, id);
      const { comet } = market;

      let baseTokenPriceFeed: string;
      let numAssets: number;
      let utilization: BigNumber;
      let baseBorrowMin: BigNumber;
      let totalSupply: BigNumber;
      let totalBorrow: BigNumber;
      {
        const calls: common.Multicall3.CallStruct[] = [
          {
            target: comet.address,
            callData: this.cometIface.encodeFunctionData('baseTokenPriceFeed'),
          },
          {
            target: comet.address,
            callData: this.cometIface.encodeFunctionData('numAssets'),
          },
          {
            target: comet.address,
            callData: this.cometIface.encodeFunctionData('baseBorrowMin'),
          },
          {
            target: comet.address,
            callData: this.cometIface.encodeFunctionData('getUtilization'),
          },
          {
            target: comet.address,
            callData: this.cometIface.encodeFunctionData('totalSupply'),
          },
          {
            target: comet.address,
            callData: this.cometIface.encodeFunctionData('totalBorrow'),
          },
        ];
        const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

        [baseTokenPriceFeed] = this.cometIface.decodeFunctionResult('baseTokenPriceFeed', returnData[0]);
        [numAssets] = this.cometIface.decodeFunctionResult('numAssets', returnData[1]);
        [baseBorrowMin] = this.cometIface.decodeFunctionResult('baseBorrowMin', returnData[2]);
        [utilization] = this.cometIface.decodeFunctionResult('getUtilization', returnData[3]);
        [totalSupply] = this.cometIface.decodeFunctionResult('totalSupply', returnData[4]);
        [totalBorrow] = this.cometIface.decodeFunctionResult('totalBorrow', returnData[5]);
      }

      const assetInfos: Omit<AssetConfig, 'totalSupply'>[] = [];
      {
        const calls: common.Multicall3.CallStruct[] = [];
        for (let i = 0; i < numAssets; i++) {
          calls.push({ target: comet.address, callData: this.cometIface.encodeFunctionData('getAssetInfo', [i]) });
        }
        const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

        for (let i = 0; i < numAssets; i++) {
          const [{ asset, priceFeed, borrowCollateralFactor, liquidateCollateralFactor, supplyCap }] =
            this.cometIface.decodeFunctionResult('getAssetInfo', returnData[i]);
          const token = await this.getToken(asset);

          assetInfos.push({
            token,
            priceFeedAddress: priceFeed,
            borrowCollateralFactor: common.toBigUnit(borrowCollateralFactor, 18),
            liquidateCollateralFactor: common.toBigUnit(liquidateCollateralFactor, 18),
            supplyCap: common.toBigUnit(supplyCap, token.decimals),
          });
        }
      }

      const assets: AssetConfig[] = [];
      {
        const calls: common.Multicall3.CallStruct[] = assetInfos.map(({ token }) => ({
          target: comet.address,
          callData: this.cometIface.encodeFunctionData('totalsCollateral', [token.address]),
        }));
        const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

        for (let i = 0; i < assetInfos.length; i++) {
          const [totalSupply] = this.cometIface.decodeFunctionResult('totalsCollateral', returnData[i]);

          const assetInfo = assetInfos[i];
          assets.push({
            ...assetInfo,
            totalSupply: common.toBigUnit(totalSupply, assetInfo.token.decimals),
          });
        }
      }

      this._marketMap[this.chainId][id] = {
        ...market,
        assets,
        numAssets,
        utilization: utilization.toString(),
        baseTokenPriceFeedAddress: baseTokenPriceFeed,
        baseBorrowMin: common.toBigUnit(baseBorrowMin, market.baseToken.decimals),
        totalSupply: common.toBigUnit(totalSupply, market.baseToken.decimals),
        totalBorrow: common.toBigUnit(totalBorrow, market.baseToken.decimals),
      };
    }

    return this._marketMap[this.chainId][id];
  }

  async getAPYs(marketId: string) {
    const { comet } = getMarketConfig(this.chainId, marketId);

    const utilization = await Comet__factory.connect(comet.address, this.provider).getUtilization({
      blockTag: this.blockTag,
    });

    const calls: common.Multicall3.CallStruct[] = [
      { target: comet.address, callData: this.cometIface.encodeFunctionData('getSupplyRate', [utilization]) },
      { target: comet.address, callData: this.cometIface.encodeFunctionData('getBorrowRate', [utilization]) },
    ];
    const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

    const [supplyRate] = this.cometIface.decodeFunctionResult('getSupplyRate', returnData[0]);
    const supplyAPR = calcAPR(supplyRate);

    const [borrowRate] = this.cometIface.decodeFunctionResult('getBorrowRate', returnData[1]);
    const borrowAPR = calcAPR(borrowRate);

    return { supplyAPR, borrowAPR };
  }

  async getPriceMap(marketId: string) {
    const { comet, baseTokenPriceFeedAddress, baseTokenQuotePriceFeedAddress, assets } = await this.getMarket(marketId);

    const calls: common.Multicall3.CallStruct[] = [];
    if (baseTokenQuotePriceFeedAddress) {
      calls.push({
        target: comet.address,
        callData: this.cometIface.encodeFunctionData('getPrice', [baseTokenQuotePriceFeedAddress]),
      });
    }
    calls.push({
      target: comet.address,
      callData: this.cometIface.encodeFunctionData('getPrice', [baseTokenPriceFeedAddress]),
    });
    for (const { priceFeedAddress } of assets) {
      calls.push({
        target: comet.address,
        callData: this.cometIface.encodeFunctionData('getPrice', [priceFeedAddress]),
      });
    }
    const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

    let j = 0;

    let baseTokenQuotePrice: BigNumber | undefined;
    if (baseTokenQuotePriceFeedAddress) {
      [baseTokenQuotePrice] = this.cometIface.decodeFunctionResult('getPrice', returnData[j]);
      j++;
    }

    let price: BigNumber;
    [price] = this.cometIface.decodeFunctionResult('getPrice', returnData[j]);
    if (baseTokenQuotePrice) {
      price = price.mul(baseTokenQuotePrice).div(1e8);
    }
    const baseTokenPrice = common.toBigUnit(price, 8);
    j++;

    const assetPriceMap: Record<string, string> = {};
    for (const { token } of assets) {
      [price] = this.cometIface.decodeFunctionResult('getPrice', returnData[j]);
      if (baseTokenQuotePrice) {
        price = price.mul(baseTokenQuotePrice).div(1e8);
      }
      assetPriceMap[token.address] = common.toBigUnit(price, 8);
      j++;
    }

    return { baseTokenPrice, assetPriceMap };
  }

  async getUserBalances(marketId: string, account: string) {
    const { comet, baseToken, assets } = await this.getMarket(marketId);

    const calls: common.Multicall3.CallStruct[] = [
      {
        target: comet.address,
        callData: this.cometIface.encodeFunctionData('balanceOf', [account]),
      },
      {
        target: comet.address,
        callData: this.cometIface.encodeFunctionData('borrowBalanceOf', [account]),
      },
    ];
    for (const { token } of assets) {
      calls.push({
        target: comet.address,
        callData: this.cometIface.encodeFunctionData('collateralBalanceOf', [account, token.wrapped.address]),
      });
    }
    const { returnData } = await this.multicall3.callStatic.aggregate(calls, { blockTag: this.blockTag });

    const [supplyBalanceWei] = this.cometIface.decodeFunctionResult('balanceOf', returnData[0]);
    const supplyBalance = common.toBigUnit(supplyBalanceWei, baseToken.decimals);

    const [borrowBalanceWei] = this.cometIface.decodeFunctionResult('borrowBalanceOf', returnData[1]);
    const borrowBalance = common.toBigUnit(borrowBalanceWei, baseToken.decimals);

    const collateralBalanceMap: Record<string, string> = {};
    for (let i = 0; i < assets.length; i++) {
      const { token } = assets[i];
      const [collateralBalanceWei] = this.cometIface.decodeFunctionResult('collateralBalanceOf', returnData[i + 2]);
      collateralBalanceMap[token.address] = common.toBigUnit(collateralBalanceWei, token.decimals);
    }

    return { supplyBalance, borrowBalance, collateralBalanceMap };
  }

  async getPortfolio(account: string, marketId: string) {
    const { baseToken, assets, baseBorrowMin, totalSupply, totalBorrow } = await this.getMarket(marketId);
    const { supplyAPR, borrowAPR } = await this.getAPYs(marketId);
    const { baseTokenPrice, assetPriceMap } = await this.getPriceMap(marketId);
    const { supplyBalance, borrowBalance, collateralBalanceMap } = await this.getUserBalances(marketId, account);
    const lstTokenAPYMap = await this.getLstTokenAPYMap(this.chainId);

    const lstApy = getLstApyFromMap(baseToken.address, lstTokenAPYMap);
    const supplyGrossApy = calcSupplyGrossApy(supplyAPR, lstApy);

    const supplies: SupplyObject[] = [
      {
        token: baseToken.unwrapped,
        price: baseTokenPrice,
        balance: supplyBalance,
        apy: supplyAPR,
        lstApy,
        grossApy: supplyGrossApy,
        usageAsCollateralEnabled: false,
        ltv: '0',
        liquidationThreshold: '0',
        isNotCollateral: true,
        totalSupply,
      },
    ];
    for (const { token, borrowCollateralFactor, liquidateCollateralFactor, supplyCap, totalSupply } of assets) {
      // compound v3 collateral assets do not earn any interest
      const apy = '0';
      const lstApy = getLstApyFromMap(token.address, lstTokenAPYMap);
      const grossApy = calcSupplyGrossApy(apy, lstApy);

      supplies.push({
        token: token.unwrapped,
        price: assetPriceMap[token.address],
        balance: collateralBalanceMap[token.address],
        apy,
        lstApy,
        grossApy,
        usageAsCollateralEnabled: true,
        ltv: borrowCollateralFactor,
        liquidationThreshold: liquidateCollateralFactor,
        supplyCap,
        totalSupply,
      });
    }

    const borrowGrossApy = calcBorrowGrossApy(borrowAPR, lstApy);
    const borrows: BorrowObject[] = [
      {
        token: baseToken.unwrapped,
        price: baseTokenPrice,
        balance: borrowBalance,
        apy: borrowAPR,
        lstApy,
        grossApy: borrowGrossApy,
        borrowMin: baseBorrowMin,
        totalBorrow,
      },
    ];

    const portfolio = new Portfolio(this.chainId, this.id, marketId, supplies, borrows);

    return portfolio;
  }

  async getPortfolios(account: string) {
    return Promise.all(configMap[this.chainId].markets.map(({ id }) => this.getPortfolio(account, id)));
  }

  newSupplyLogic({ marketId, input }: SupplyParams) {
    const { baseToken, comet } = getMarketConfig(this.chainId, marketId);

    if (input.token.wrapped.is(baseToken)) {
      return apisdk.falconsdk.compoundv3.newSupplyBaseLogic({
        marketId,
        input,
        output: new common.TokenAmount(comet, input.amount),
      });
    } else {
      return apisdk.falconsdk.compoundv3.newSupplyCollateralLogic({ marketId, input });
    }
  }

  newWithdrawLogic({ marketId, output }: WithdrawParams) {
    const { baseToken, comet } = getMarketConfig(this.chainId, marketId);
    if (output.token.wrapped.is(baseToken)) {
      return apisdk.falconsdk.compoundv3.newWithdrawBaseLogic({
        marketId,
        input: new common.TokenAmount(comet, output.amount),
        output,
      });
    } else {
      return apisdk.falconsdk.compoundv3.newWithdrawCollateralLogic({ marketId, output });
    }
  }

  newBorrowLogic = apisdk.falconsdk.compoundv3.newBorrowLogic;

  newRepayLogic({ marketId, input, account }: RepayParams) {
    return apisdk.falconsdk.compoundv3.newRepayLogic({ marketId, input, borrower: account });
  }
}
