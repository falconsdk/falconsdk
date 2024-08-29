import { LendingProtocol } from './lending-protocol';
import { arbitrumTokens, mainnetTokens, polygonTokens } from './tokens';
import * as common from '@falcon/common';
import { expect } from 'chai';
import { filterPortfolio } from 'src/protocol.utils';
import * as logics from '@falcon/logics';

describe('Test Compound V3 LendingProtocol', function () {
  context('Test getPortfolio', function () {
    const testCases = [
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.USDC,
        account: '0x8d1Fb1241880d2A30d9d2762C8dB643a5145B21B',
        blockTag: 17699700,
        expected: {
          chainId: 1,
          protocolId: 'compound-v3',
          marketId: 'USDC',
          utilization: '0',
          healthRate: 'Infinity',
          netAPY: '0.052483458259584',
          totalSupplyUSD: '802.844449',
          totalBorrowUSD: '0',
          supplies: [
            {
              token: {
                chainId: 1,
                address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
              },
              price: '1',
              balance: '802.844449',
              apy: '0.052483458259584',
              lstApy: '0',
              grossApy: '0.052483458259584',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: true,
              supplyCap: '0',
              totalSupply: '376463933.183094',
            },
            {
              token: {
                chainId: 1,
                address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
                decimals: 18,
                symbol: 'COMP',
                name: 'Compound',
              },
              price: '75.002',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.65',
              liquidationThreshold: '0.7',
              isNotCollateral: false,
              supplyCap: '900000',
              totalSupply: '880449.449526524547533425',
            },
            {
              token: {
                chainId: 1,
                address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                decimals: 8,
                symbol: 'WBTC',
                name: 'Wrapped BTC',
              },
              price: '30298.95',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.77',
              isNotCollateral: false,
              supplyCap: '12000',
              totalSupply: '9426.44861298',
            },
            {
              token: {
                chainId: 1,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '1933.940035',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.825',
              liquidationThreshold: '0.895',
              isNotCollateral: false,
              supplyCap: '350000',
              totalSupply: '211386.072930843352559867',
            },
            {
              token: {
                chainId: 1,
                address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
                decimals: 18,
                symbol: 'UNI',
                name: 'Uniswap',
              },
              price: '5.8920278',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.81',
              isNotCollateral: false,
              supplyCap: '2300000',
              totalSupply: '2218301.154520531651232401',
            },
            {
              token: {
                chainId: 1,
                address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
                decimals: 18,
                symbol: 'LINK',
                name: 'ChainLink Token',
              },
              price: '6.96700785',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.79',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '1250000',
              totalSupply: '1003607.755629872999969856',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 1,
                address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
              },
              price: '1',
              balance: '0',
              apy: '0.039969999949824',
              lstApy: '0',
              grossApy: '0.039969999949824',
              borrowMin: '100',
              borrowCap: '0',
              totalBorrow: '367638468.435308',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        account: '0xAa43599FbCd3C655f6Fe6e69dba8477062f4eFAD',
        blockTag: 17699700,
        expected: {
          chainId: 1,
          protocolId: 'compound-v3',
          marketId: 'ETH',
          utilization: '0',
          healthRate: 'Infinity',
          totalSupplyUSD: '8966.95502603240985750683884',
          totalBorrowUSD: '0',
          supplies: [
            {
              token: {
                chainId: 1,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '1933.940035',
              balance: '4.636625160941150824',
              apy: '0.012615558222672',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: true,
              supplyCap: '0',
              totalSupply: '51748.404517469527691373',
            },
            {
              token: {
                chainId: 1,
                address: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
                decimals: 18,
                symbol: 'cbETH',
                name: 'Coinbase Wrapped Staked ETH',
              },
              price: '2016.13917792',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.9',
              liquidationThreshold: '0.93',
              isNotCollateral: false,
              supplyCap: '40000',
              totalSupply: '854.935502499225867094',
            },
            {
              token: {
                chainId: 1,
                address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
                decimals: 18,
                symbol: 'wstETH',
                name: 'Wrapped liquid staked Ether 2.0',
              },
              price: '2188.89305168',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.9',
              liquidationThreshold: '0.93',
              isNotCollateral: false,
              supplyCap: '64500',
              totalSupply: '26045.113583149797580496',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 1,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '1933.940035',
              balance: '0',
              apy: '0.032931764469936',
              grossApy: '0.032931764469936',
              borrowMin: '0.1',
              borrowCap: '0',
              totalBorrow: '23001.448694259417393217',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.polygon,
        marketId: logics.compoundv3.MarketId.USDCe,
        account: '0x9fC7D6E7a3d4aB7b8b28d813f68674C8A6e91e83',
        blockTag: 45221016,
        expected: {
          chainId: 137,
          protocolId: 'compound-v3',
          marketId: 'USDC.e',
          utilization: '0.62899605117035539651',
          healthRate: '1.6924051066004987073',
          totalSupplyUSD: '350.776292007540263981961',
          totalBorrowUSD: '170.9935994506148',
          supplies: [
            {
              token: {
                chainId: 137,
                address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'USD Coin (PoS)',
              },
              price: '0.99995719',
              balance: '0',
              apy: '0.025882667487072',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: true,
              supplyCap: '0',
              totalSupply: '22406282.874219',
            },
            {
              token: {
                chainId: 137,
                address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
                decimals: 18,
                symbol: 'WETH',
                name: 'Wrapped Ether',
              },
              price: '1901.797',
              balance: '0.184444655243193813',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.775',
              liquidationThreshold: '0.825',
              isNotCollateral: false,
              supplyCap: '20000',
              totalSupply: '7588.387144851820674841',
            },
            {
              token: {
                chainId: 137,
                address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
                decimals: 8,
                symbol: 'WBTC',
                name: '(PoS) Wrapped BTC',
              },
              price: '30035.14459631',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '1000',
              totalSupply: '588.67600969',
            },
            {
              token: {
                chainId: 137,
                address: '0x0000000000000000000000000000000000001010',
                decimals: 18,
                symbol: 'MATIC',
                name: 'Matic Token',
              },
              price: '0.75599807',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.65',
              liquidationThreshold: '0.7',
              isNotCollateral: false,
              supplyCap: '20000000',
              totalSupply: '3514791.474058960717011551',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 137,
                address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'USD Coin (PoS)',
              },
              price: '0.99995719',
              balance: '171.00092',
              apy: '0.042873641892576',
              grossApy: '0.042873641892576',
              borrowMin: '100',
              borrowCap: '0',
              totalBorrow: '17844140.383447',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.base,
        marketId: logics.compoundv3.MarketId.USDbC,
        account: '0xc90c3602196b8fc9cf56be845dc55d6a45529dcd',
        blockTag: 9379220,
        expected: {
          chainId: 8453,
          protocolId: 'compound-v3',
          marketId: 'USDbC',
          utilization: '0',
          healthRate: 'Infinity',
          totalSupplyUSD: '38466.37114238206232',
          totalBorrowUSD: '0',
          supplies: [
            {
              token: {
                chainId: 8453,
                address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
                decimals: 6,
                symbol: 'USDbC',
                name: 'USD Base Coin',
              },
              price: '1.00008538',
              balance: '38463.087164',
              apy: '0.071690185894752',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: true,
              supplyCap: '0',
              totalSupply: '10574654.392288',
            },
            {
              token: {
                chainId: 8453,
                address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                decimals: 18,
                symbol: 'cbETH',
                name: 'Coinbase Wrapped Staked ETH',
              },
              price: '2665.89001728',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.8',
              isNotCollateral: false,
              supplyCap: '7500',
              totalSupply: '6597.5892550402501136',
            },
            {
              token: {
                chainId: 8453,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '2525.91577221',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.79',
              liquidationThreshold: '0.84',
              isNotCollateral: false,
              supplyCap: '11000',
              totalSupply: '1626.37083896310567384',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 8453,
                address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
                decimals: 6,
                symbol: 'USDbC',
                name: 'USD Base Coin',
              },
              price: '1.00008538',
              balance: '0',
              apy: '0.094801459105728',
              grossApy: '0.094801459105728',
              borrowMin: '0.000001',
              borrowCap: '0',
              totalBorrow: '9192623.950025',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.base,
        marketId: logics.compoundv3.MarketId.ETH,
        account: '0x6a9f813fb3e6a8f7013dabd1695bae1d49ae8481',
        blockTag: 9379220,
        expected: {
          chainId: 8453,
          protocolId: 'compound-v3',
          marketId: 'ETH',
          utilization: '0',
          healthRate: 'Infinity',
          netAPY: '0.010623922798752',
          totalSupplyUSD: '1267777.27879868606522864345748738',
          totalBorrowUSD: '0',
          supplies: [
            {
              token: {
                chainId: 8453,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '2525.91577221',
              balance: '501.907978384199815578',
              apy: '0.010623922798752',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: true,
              supplyCap: '0',
              totalSupply: '5624.560907543827746172',
            },
            {
              token: {
                chainId: 8453,
                address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
                decimals: 18,
                symbol: 'cbETH',
                name: 'Coinbase Wrapped Staked ETH',
              },
              price: '2665.89000094',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.9',
              liquidationThreshold: '0.93',
              isNotCollateral: false,
              supplyCap: '7500',
              totalSupply: '2737.045044874825250858',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 8453,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '2525.91577221',
              balance: '0',
              apy: '0.019873491895584',
              grossApy: '0.019873491895584',
              borrowMin: '0.000001',
              borrowCap: '0',
              totalBorrow: '2390.198321091299000883',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDCe,
        account: '0xA62315902fAADC69F898cc8B85F86FfD1F6aAeD8',
        blockTag: 226000000,
        expected: {
          chainId: 42161,
          protocolId: 'compound-v3',
          marketId: 'USDC.e',
          utilization: '0',
          healthRate: 'Infinity',
          netAPY: '0',
          totalSupplyUSD: '0.0006115275098442615185097',
          totalBorrowUSD: '0',
          supplies: [
            {
              token: {
                chainId: 42161,
                address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'Bridged USDC',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99998806',
              balance: '0',
              apy: '0.0972086540832',
              lstApy: '0',
              grossApy: '0.0972086540832',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: true,
              supplyCap: '0',
              totalSupply: '1935245.944389',
            },
            {
              token: {
                chainId: 42161,
                address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                decimals: 18,
                symbol: 'ARB',
                name: 'Arbitrum',
              },
              price: '0.8058999',
              balance: '0.000000461031091903',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.55',
              liquidationThreshold: '0.6',
              isNotCollateral: false,
              supplyCap: '4000000',
              totalSupply: '415285.702338874210142019',
            },
            {
              token: {
                chainId: 42161,
                address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                decimals: 18,
                symbol: 'GMX',
                name: 'GMX',
              },
              price: '28.10476771',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.4',
              liquidationThreshold: '0.45',
              isNotCollateral: false,
              supplyCap: '50000',
              totalSupply: '223.573965582075042015',
            },
            {
              token: {
                chainId: 42161,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
                logoUri: 'https://cdn.falcon.app/assets/img/token/ETH.png',
              },
              price: '3366.21432',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.78',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '5000',
              totalSupply: '762.754710370852497112',
            },
            {
              token: {
                chainId: 42161,
                address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                decimals: 8,
                symbol: 'WBTC',
                name: 'Wrapped BTC',
              },
              price: '61115.59649334',
              balance: '0.00000001',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.77',
              isNotCollateral: false,
              supplyCap: '300',
              totalSupply: '15.72654811',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 42161,
                address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'Bridged USDC',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99998806',
              balance: '0',
              apy: '0.123509735857152',
              lstApy: '0',
              grossApy: '0.123509735857152',
              borrowMin: '100',
              borrowCap: '0',
              totalBorrow: '1713200.624357',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDC,
        account: '0xA62315902fAADC69F898cc8B85F86FfD1F6aAeD8',
        blockTag: 226000000,
        expected: {
          chainId: 42161,
          protocolId: 'compound-v3',
          marketId: 'USDC',
          utilization: '0',
          healthRate: 'Infinity',
          netAPY: '0',
          totalSupplyUSD: '0.0006111559649334',
          totalBorrowUSD: '0',
          supplies: [
            {
              token: {
                chainId: 42161,
                address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99998806',
              balance: '0',
              apy: '0.05565876199704',
              lstApy: '0',
              grossApy: '0.05565876199704',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: true,
              supplyCap: '0',
              totalSupply: '25082386.385829',
            },
            {
              token: {
                chainId: 42161,
                address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                decimals: 18,
                symbol: 'ARB',
                name: 'Arbitrum',
              },
              price: '0.8058999',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.8',
              isNotCollateral: false,
              supplyCap: '16000000',
              totalSupply: '5348497.247106475580301238',
            },
            {
              token: {
                chainId: 42161,
                address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
                decimals: 18,
                symbol: 'GMX',
                name: 'GMX',
              },
              price: '28.10476771',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.6',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '120000',
              totalSupply: '9257.248222764089398175',
            },
            {
              token: {
                chainId: 42161,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
                logoUri: 'https://cdn.falcon.app/assets/img/token/ETH.png',
              },
              price: '3366.21432',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.78',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '10000',
              totalSupply: '4699.309710499658526844',
            },
            {
              token: {
                chainId: 42161,
                address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                decimals: 8,
                symbol: 'WBTC',
                name: 'Wrapped BTC',
              },
              price: '61115.59649334',
              balance: '0.00000001',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '1200',
              totalSupply: '325.57079801',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 42161,
                address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99998806',
              balance: '0',
              apy: '0.076818331644912',
              lstApy: '0',
              grossApy: '0.076818331644912',
              borrowMin: '0.000001',
              borrowCap: '0',
              totalBorrow: '18614075.875654',
            },
          ],
        },
      },
    ];

    testCases.forEach(({ chainId, marketId, account, blockTag, expected }) => {
      it(`${common.toNetworkId(chainId)} ${marketId} market with blockTag ${blockTag}`, async function () {
        const protocol = await LendingProtocol.createProtocol(chainId);
        protocol.setBlockTag(blockTag);
        const _portfolio = await protocol.getPortfolio(account, marketId);
        const portfolio = JSON.parse(JSON.stringify(_portfolio));

        const filteredPortfolio = filterPortfolio(portfolio);
        const filteredExpected = filterPortfolio(expected);

        expect(filteredPortfolio).to.deep.equal(filteredExpected);
      }).timeout(60000);
    });
  });

  context('Test canCollateralSwap', function () {
    const testCases = [
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: mainnetTokens.USDC,
        expected: false,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: mainnetTokens.WBTC,
        expected: true,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        asset: mainnetTokens.ETH,
        expected: false,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        asset: mainnetTokens.WETH,
        expected: false,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        asset: mainnetTokens.cbETH,
        expected: true,
      },
      {
        chainId: common.ChainId.polygon,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: polygonTokens['USDC.e'],
        expected: false,
      },
      {
        chainId: common.ChainId.polygon,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: polygonTokens.WBTC,
        expected: true,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: arbitrumTokens['USDC.e'],
        expected: false,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: arbitrumTokens.WBTC,
        expected: true,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: arbitrumTokens.USDC,
        expected: false,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: arbitrumTokens.WBTC,
        expected: true,
      },
    ];

    testCases.forEach(({ chainId, marketId, asset, expected }) => {
      it(`${common.toNetworkId(chainId)} ${marketId} market - ${asset.symbol}`, async function () {
        const protocol = await LendingProtocol.createProtocol(chainId);
        expect(protocol.canCollateralSwap(marketId, asset)).to.eq(expected);
      });
    });
  });

  context('Test toUnderlyingToken, toProtocolToken', function () {
    const testCases = [
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.USDC,
        expected: [mainnetTokens.USDC, mainnetTokens.cUSDCv3],
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        expected: [mainnetTokens.ETH, mainnetTokens.cWETHv3],
      },
      {
        chainId: common.ChainId.polygon,
        marketId: logics.compoundv3.MarketId.USDCe,
        expected: [polygonTokens['USDC.e'], polygonTokens.cUSDCv3],
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDCe,
        expected: [arbitrumTokens['USDC.e'], arbitrumTokens.cUSDCev3],
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDC,
        expected: [arbitrumTokens.USDC, arbitrumTokens.cUSDCv3],
      },
    ];

    testCases.forEach(({ chainId, marketId, expected }) => {
      it(`${common.toNetworkId(chainId)} ${marketId} market`, async function () {
        const protocol = await LendingProtocol.createProtocol(chainId);
        expect(protocol.toUnderlyingToken(marketId).is(expected[0])).to.be.true;
        expect(protocol.toProtocolToken(marketId).is(expected[1])).to.be.true;
      });
    });
  });

  context('Test isAssetTokenized', function () {
    const testCases = [
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: mainnetTokens.USDC,
        expected: true,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: mainnetTokens.WBTC,
        expected: false,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        asset: mainnetTokens.ETH,
        expected: true,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        asset: mainnetTokens.WETH,
        expected: true,
      },
      {
        chainId: common.ChainId.mainnet,
        marketId: logics.compoundv3.MarketId.ETH,
        asset: mainnetTokens.cbETH,
        expected: false,
      },
      {
        chainId: common.ChainId.polygon,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: polygonTokens['USDC.e'],
        expected: true,
      },
      {
        chainId: common.ChainId.polygon,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: polygonTokens.WBTC,
        expected: false,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: arbitrumTokens['USDC.e'],
        expected: true,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDCe,
        asset: arbitrumTokens.WBTC,
        expected: false,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: arbitrumTokens.USDC,
        expected: true,
      },
      {
        chainId: common.ChainId.arbitrum,
        marketId: logics.compoundv3.MarketId.USDC,
        asset: arbitrumTokens.WBTC,
        expected: false,
      },
    ];

    testCases.forEach(({ chainId, marketId, asset, expected }) => {
      it(`${common.toNetworkId(chainId)} ${marketId} market - ${asset.symbol}`, async function () {
        const protocol = await LendingProtocol.createProtocol(chainId);

        expect(protocol.isAssetTokenized(marketId, asset)).to.eq(expected);
      });
    });
  });
});
