import { JsonRpcProvider } from '@ethersproject/providers';
import { LendingProtocol } from './lending-protocol';
import { Portfolio } from 'src/protocol.portfolio';
import { arbitrumTokens, bnbTokens, mainnetTokens } from './tokens';
import * as common from '@falcon/common';
import { expect } from 'chai';
import { filterPortfolio } from 'src/protocol.utils';

describe('Test Radiant V2 LendingProtocol', function () {
  context('Test getPortfolio', function () {
    const testCases = [
      {
        chainId: common.ChainId.mainnet,
        account: '0xaF184b4cBc73A9Ca2F51c4a4d80eD67a2578E9F4',
        blockTag: 20000000,
        expected: {
          chainId: 1,
          protocolId: 'radiant-v2',
          marketId: 'mainnet',
          utilization: '0.8174651291733022094',
          healthRate: '1.270424560536212322',
          totalSupplyUSD: '829174.29190796194925539907917736',
          totalBorrowUSD: '529970.4301314711752027658968675',
          supplies: [
            {
              token: mainnetTokens.USDT,
              price: '0.99912577',
              balance: '293244.926598',
              apy: '0.0321092011099533673',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.78',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '2525377.507712',
            },
            {
              token: mainnetTokens.USDC,
              price: '1.00005',
              balance: '20049.675786',
              apy: '0.03657940828520463137',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.83',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '4504945.241334',
            },
            {
              token: mainnetTokens.ETH,
              price: '3810.13582871',
              balance: '132.235914293417557263',
              apy: '0.05263157709475758322',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.83',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '2054.016615033045973535',
            },
            {
              token: mainnetTokens.WBTC,
              price: '67692.16439622',
              balance: '0.05664234',
              apy: '0.00815893596185290099',
              usageAsCollateralEnabled: true,
              ltv: '0.73',
              liquidationThreshold: '0.78',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '105.33192072',
            },
            {
              token: mainnetTokens.wstETH,
              price: '4451.7922676',
              balance: '1.256791116921100203',
              apy: '0.02168647903563481947',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.83',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '1760.709343166226626961',
            },
            {
              token: mainnetTokens.sDAI,
              price: '1.08594206',
              balance: '1444.334242869700584943',
              apy: '0.01897427303760700907',
              usageAsCollateralEnabled: true,
              ltv: '0.77',
              liquidationThreshold: '0.8',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '1605196.910728520564528363',
            },
            {
              token: mainnetTokens.rETH,
              price: '4220.13743235',
              balance: '0.308183515639294375',
              apy: '0.03616883757121200337',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.8',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '292.873865736590586357',
            },
            {
              token: mainnetTokens.weETH,
              price: '3961.56758438',
              balance: '0',
              apy: '0.00666986344642740114',
              usageAsCollateralEnabled: true,
              ltv: '0.67',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '35.01806263436514219',
            },
          ],
          borrows: [
            {
              token: mainnetTokens.USDT,
              price: '0.99912577',
              balance: '452611.289087',
              apy: '0.16109336527932400786',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '2138846.109957',
            },
            {
              token: mainnetTokens.USDC,
              price: '1.00005',
              balance: '0',
              apy: '0.18347518123312229154',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '3843979.682283',
            },
            {
              token: mainnetTokens.ETH,
              price: '3810.13582871',
              balance: '0',
              apy: '0.27583819933447551644',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1730.40583256880497105',
            },
            {
              token: mainnetTokens.WBTC,
              price: '67692.16439622',
              balance: '1.13866282',
              apy: '0.07750245695701618442',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '45.88193036',
            },
            {
              token: mainnetTokens.wstETH,
              price: '4451.7922676',
              balance: '0',
              apy: '0.15774498701789162304',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1031.805293209665710966',
            },
            {
              token: mainnetTokens.sDAI,
              price: '1.08594206',
              balance: '0',
              apy: '0.14079085887960466877',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '916777.759247472576730888',
            },
            {
              token: mainnetTokens.rETH,
              price: '4220.13743235',
              balance: '0.16024990163641505',
              apy: '0.25234882260325146882',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '185.077351228700433715',
            },
            {
              token: mainnetTokens.weETH,
              price: '3961.56758438',
              balance: '0',
              apy: '0.09342559864795353687',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '10.430224694196276706',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.bnb,
        account: '0xA15aEF397F9Dc9dE23C8e3Df8A289B21D4cA8fCD',
        blockTag: 38738990,
        expected: {
          chainId: 56,
          protocolId: 'radiant-v2',
          marketId: 'bnb',
          utilization: '1',
          healthRate: '1.03627738230590567017',
          totalSupplyUSD: '7113376.792946228696130057217',
          totalBorrowUSD: '5148266.94649033938170577969',
          supplies: [
            {
              token: bnbTokens.BTCB,
              price: '62129.33',
              balance: '114.493054935484124489',
              apy: '0.0018842556485471865',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '1084.102838189283152716',
            },
            {
              token: bnbTokens.USDT,
              price: '0.99970008',
              balance: '0',
              apy: '0.02809968318672521642',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '9582650.310842046916079284',
            },
            {
              token: bnbTokens.USDC,
              price: '1.000018',
              balance: '0',
              apy: '0.01251803618013794467',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '1311271.707413182088378375',
            },
            {
              token: bnbTokens.ETH,
              price: '2907.3027',
              balance: '0.000000000656295226',
              apy: '0.00677823374176924093',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.825',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '1118.474147562476422245',
            },
            {
              token: bnbTokens.BNB,
              price: '566.5998',
              balance: '0.000000263852488316',
              apy: '0.03966107938030156714',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.825',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '19635.216840550330009192',
            },
            {
              token: bnbTokens.wBETH,
              price: '3017.76764108',
              balance: '0',
              apy: '0.01238230639109096255',
              usageAsCollateralEnabled: true,
              ltv: '0.67',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '969.973021380570422044',
            },
          ],
          borrows: [
            {
              token: bnbTokens.BTCB,
              price: '62129.33',
              balance: '82.863712621564394493',
              apy: '0.02976988296074147581',
              grossApy: '0.02976988296074147581',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '278.272527950440262515',
            },
            {
              token: bnbTokens.USDT,
              price: '0.99970008',
              balance: '0',
              apy: '0.15507688545570079884',
              grossApy: '0.15507688545570079884',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '7368045.665148012727993507',
            },
            {
              token: bnbTokens.USDC,
              price: '1.000018',
              balance: '0',
              apy: '0.10141224907698186083',
              grossApy: '0.10141224907698186083',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '675538.856929831366139788',
            },
            {
              token: bnbTokens.ETH,
              price: '2907.3027',
              balance: '0',
              apy: '0.06186185971038594771',
              grossApy: '0.06186185971038594771',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '503.514650192829467621',
            },
            {
              token: bnbTokens.BNB,
              price: '566.5998',
              balance: '0',
              apy: '0.24293350514121534581',
              grossApy: '0.24293350514121534581',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '14047.112894395678975454',
            },
            {
              token: bnbTokens.wBETH,
              price: '3017.76764108',
              balance: '0',
              apy: '0.1292138860658574247',
              grossApy: '0.1292138860658574247',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '392.931959676069635801',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.arbitrum,
        account: '0xBf891E7eFCC98A8239385D3172bA10AD593c7886',
        blockTag: 226250000,
        expected: {
          chainId: 42161,
          protocolId: 'radiant-v2',
          marketId: 'arbitrum',
          utilization: '0.76901818704071372917',
          healthRate: '1.39450131175575381947',
          netAPY: '-0.61015761575344101396',
          totalSupplyUSD: '129187.13686330277942276717170872',
          totalBorrowUSD: '69447.4369989312298',
          supplies: [
            {
              token: {
                chainId: 42161,
                address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                decimals: 8,
                symbol: 'WBTC',
                name: 'Wrapped BTC',
                logoUri: 'https://cdn.falcon.app/assets/img/token/WBTC.svg',
              },
              price: '61306.664',
              balance: '2.0196802',
              apy: '0.00294440149231470325',
              lstApy: '0',
              grossApy: '0.00294440149231470325',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '519.83032982',
            },
            {
              token: {
                chainId: 42161,
                address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                decimals: 6,
                symbol: 'USDT',
                name: 'Tether USD',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDT.svg',
              },
              price: '0.99971',
              balance: '216.439086',
              apy: '0.08754588399013199251',
              lstApy: '0',
              grossApy: '0.08754588399013199251',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '2633074.631507',
            },
            {
              token: {
                chainId: 42161,
                address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'Bridged USDC',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99981755',
              balance: '178.065635',
              apy: '0.09471234334601085579',
              lstApy: '0',
              grossApy: '0.09471234334601085579',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '2797131.846949',
            },
            {
              token: {
                chainId: 42161,
                address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
                decimals: 18,
                symbol: 'DAI',
                name: 'Dai Stablecoin',
                logoUri: 'https://cdn.falcon.app/assets/img/token/DAI.png',
              },
              price: '0.9998575',
              balance: '504.999944402883484857',
              apy: '0.0450570076315794508',
              lstApy: '0',
              grossApy: '0.0450570076315794508',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '196713.063190102427283406',
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
              price: '3410.90336007',
              balance: '0.149370591268257448',
              apy: '0.02184525481577528103',
              lstApy: '0',
              grossApy: '0.02184525481577528103',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.825',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '7686.873783656297255925',
            },
            {
              token: {
                chainId: 42161,
                address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                decimals: 18,
                symbol: 'wstETH',
                name: 'Wrapped liquid staked Ether 2.0',
                logoUri: 'https://cdn.falcon.app/assets/img/token/wstETH.png',
              },
              price: '3985.38395484',
              balance: '0.333476759987468522',
              apy: '0.00711650536694286969',
              lstApy: '0.03',
              grossApy: '0.03711650536694286969',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.8',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '4876.73761190907449626',
            },
            {
              token: {
                chainId: 42161,
                address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                decimals: 18,
                symbol: 'ARB',
                name: 'Arbitrum',
                logoUri: 'https://cdn.falcon.app/assets/img/token/ARB.svg',
              },
              price: '0.81345',
              balance: '2803.700338383224935524',
              apy: '0.00478873183928620102',
              lstApy: '0',
              grossApy: '0.00478873183928620102',
              usageAsCollateralEnabled: true,
              ltv: '0.58',
              liquidationThreshold: '0.63',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '6970060.856290522809947844',
            },
            {
              token: {
                chainId: 42161,
                address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99981755',
              balance: '332.787821',
              apy: '0.16543876392109459817',
              lstApy: '0',
              grossApy: '0.16543876392109459817',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '6924939.407269',
            },
            {
              token: {
                chainId: 42161,
                address: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
                decimals: 18,
                symbol: 'weETH',
                name: 'Wrapped eETH',
                logoUri: 'https://cdn.falcon.app/assets/img/token/weETH.webp',
              },
              price: '3552.61645303',
              balance: '0.004510839496064846',
              apy: '0.00479808992821617205',
              lstApy: '0',
              grossApy: '0.00479808992821617205',
              usageAsCollateralEnabled: true,
              ltv: '0.725',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '4326.463488802731719953',
            },
            {
              token: {
                chainId: 42161,
                address: '0x47c031236e19d024b42f8AE6780E44A573170703',
                decimals: 18,
                symbol: 'GM',
                name: 'GMX Market',
              },
              price: '1.65737992',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.55',
              liquidationThreshold: '0.6',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '271022.252218413764066867',
            },
            {
              token: {
                chainId: 42161,
                address: '0x70d95587d40A2caf56bd97485aB3Eec10Bee6336',
                decimals: 18,
                symbol: 'GM',
                name: 'GMX Market',
              },
              price: '1.60388761',
              balance: '0',
              apy: '0',
              lstApy: '0',
              grossApy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.6',
              liquidationThreshold: '0.65',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '340876.7937409093328711',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 42161,
                address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
                decimals: 8,
                symbol: 'WBTC',
                name: 'Wrapped BTC',
                logoUri: 'https://cdn.falcon.app/assets/img/token/WBTC.svg',
              },
              price: '61306.664',
              balance: '0',
              apy: '0.04183994455387041056',
              lstApy: '0',
              grossApy: '0.04183994455387041056',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '149.1488538',
            },
            {
              token: {
                chainId: 42161,
                address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
                decimals: 6,
                symbol: 'USDT',
                name: 'Tether USD',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDT.svg',
              },
              price: '0.99971',
              balance: '0',
              apy: '0.4594100532532054733',
              lstApy: '0',
              grossApy: '0.4594100532532054733',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '2338210.540033',
            },
            {
              token: {
                chainId: 42161,
                address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'Bridged USDC',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99981755',
              balance: '0',
              apy: '0.5000897882575348147',
              lstApy: '0',
              grossApy: '0.5000897882575348147',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '2496714.228911',
            },
            {
              token: {
                chainId: 42161,
                address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
                decimals: 18,
                symbol: 'DAI',
                name: 'Dai Stablecoin',
                logoUri: 'https://cdn.falcon.app/assets/img/token/DAI.png',
              },
              price: '0.9998575',
              balance: '0',
              apy: '0.22774023207130384592',
              lstApy: '0',
              grossApy: '0.22774023207130384592',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '169019.476202767459670603',
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
              price: '3410.90336007',
              balance: '0',
              apy: '0.11385636765954302649',
              lstApy: '0',
              grossApy: '0.11385636765954302649',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '6162.168672813000622966',
            },
            {
              token: {
                chainId: 42161,
                address: '0x5979D7b546E38E414F7E9822514be443A4800529',
                decimals: 18,
                symbol: 'wstETH',
                name: 'Wrapped liquid staked Ether 2.0',
                logoUri: 'https://cdn.falcon.app/assets/img/token/wstETH.png',
              },
              price: '3985.38395484',
              balance: '0',
              apy: '0.09663597872379325571',
              lstApy: '0.03',
              grossApy: '0.06663597872379325571',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1499.553383356840192211',
            },
            {
              token: {
                chainId: 42161,
                address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
                decimals: 18,
                symbol: 'ARB',
                name: 'Arbitrum',
                logoUri: 'https://cdn.falcon.app/assets/img/token/ARB.svg',
              },
              price: '0.81345',
              balance: '0',
              apy: '0.07865512479413314301',
              lstApy: '0',
              grossApy: '0.07865512479413314301',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1759127.641081437793560078',
            },
            {
              token: {
                chainId: 42161,
                address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
                logoUri: 'https://cdn.falcon.app/assets/img/token/USDC.svg',
              },
              price: '0.99981755',
              balance: '69460.109996',
              apy: '0.53278088398375753529',
              lstApy: '0',
              grossApy: '0.53278088398375753529',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '6206004.183837',
            },
            {
              token: {
                chainId: 42161,
                address: '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe',
                decimals: 18,
                symbol: 'weETH',
                name: 'Wrapped eETH',
                logoUri: 'https://cdn.falcon.app/assets/img/token/weETH.webp',
              },
              price: '3552.61645303',
              balance: '0',
              apy: '0.05313727687111372077',
              lstApy: '0',
              grossApy: '0.05313727687111372077',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1599.97593280670225528',
            },
          ],
        },
      },
    ];

    testCases.forEach(({ chainId, account, blockTag, expected }) => {
      it(`${common.toNetworkId(chainId)} market with blockTag ${blockTag}`, async function () {
        const protocol = await LendingProtocol.createProtocol(chainId);

        protocol.setBlockTag(blockTag);
        const _portfolio = await protocol.getPortfolio(account);
        const portfolio: Portfolio = JSON.parse(JSON.stringify(_portfolio));

        const filteredPortfolio = filterPortfolio(portfolio);
        const filteredExpected = filterPortfolio(expected);

        expect(filteredPortfolio).to.deep.equal(filteredExpected);
      });
    });
  });
});
