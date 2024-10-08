import { LendingProtocol } from './lending-protocol';
import { Portfolio } from 'src/protocol.portfolio';
import * as common from '@falcon/common';
import { expect } from 'chai';
import { filterPortfolio } from 'src/protocol.utils';

describe('Test Aave V2 LendingProtocol', function () {
  context('Test getPortfolio', function () {
    const testCases = [
      {
        chainId: common.ChainId.mainnet,
        account: '0xc94680947CF2114ec8eE43725898EAA7269a98c5',
        blockTag: 18797586,
        expected: {
          chainId: 1,
          protocolId: 'aave-v2',
          marketId: 'mainnet',
          utilization: '0.84307014133511974015',
          healthRate: '1.35125085967495134596',
          netAPY: '0.00470040090095533412',
          totalSupplyUSD: '74630251.48508760401719470575176',
          totalBorrowUSD: '46349296.55097934829189739308277',
          supplies: [
            {
              token: {
                chainId: 1,
                address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
                decimals: 18,
                symbol: 'AAVE',
                name: 'Aave Token',
              },
              price: '105.14608582',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.66',
              liquidationThreshold: '0.73',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '130269.459014439082680449',
            },
            {
              token: {
                chainId: 1,
                address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                decimals: 18,
                symbol: 'DAI',
                name: 'Dai Stablecoin',
              },
              price: '1.00070489',
              balance: '0',
              apy: '0.06039649841678908996',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.87',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '77818950.444934880550554079',
            },
            {
              token: {
                chainId: 1,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '2242.39893',
              balance: '0',
              apy: '0.00916817498078637062',
              usageAsCollateralEnabled: true,
              ltv: '0.825',
              liquidationThreshold: '0.86',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '321984.797913761896213214',
            },
            {
              token: {
                chainId: 1,
                address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
                decimals: 18,
                symbol: 'FRAX',
                name: 'Frax',
              },
              price: '1.00993502',
              balance: '0',
              apy: '0.14450408118649581654',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '1267209.01283512516028469',
            },
            {
              token: {
                chainId: 1,
                address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd',
                decimals: 2,
                symbol: 'GUSD',
                name: 'Gemini dollar',
              },
              price: '0.99999999',
              balance: '0',
              apy: '0.02829120928712811107',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '795721.18',
            },
            {
              token: {
                chainId: 1,
                address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
                decimals: 18,
                symbol: 'LUSD',
                name: 'LUSD Stablecoin',
              },
              price: '0.99907345',
              balance: '0',
              apy: '0.02996184796985743881',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '413626.813416484247526599',
            },
            {
              token: {
                chainId: 1,
                address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
              },
              price: '1.00052179',
              balance: '15529603.860255',
              apy: '0.09796037628587413794',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.875',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '331096647.584172',
            },
            {
              token: {
                chainId: 1,
                address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                decimals: 6,
                symbol: 'USDT',
                name: 'Tether USD',
              },
              price: '0.99311457',
              balance: '0',
              apy: '0.10457023515211070635',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '219828821.617495',
            },
            {
              token: {
                chainId: 1,
                address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                decimals: 8,
                symbol: 'WBTC',
                name: 'Wrapped BTC',
              },
              price: '42011.50322746',
              balance: '30.41724088',
              apy: '0.00094330871348293318',
              usageAsCollateralEnabled: true,
              ltv: '0.72',
              liquidationThreshold: '0.82',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '17711.3920269',
            },
            {
              token: {
                chainId: 1,
                address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
                decimals: 18,
                symbol: 'sUSD',
                name: 'Synth sUSD',
              },
              price: '0.99932685',
              balance: '0',
              apy: '0.02081794981150289325',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '2002812.127316008489175021',
            },
            {
              token: {
                chainId: 1,
                address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
                decimals: 18,
                symbol: 'stETH',
                name: 'Lido Staked Ether',
              },
              price: '2242.39893',
              balance: '25782.508922011398440232',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.72',
              liquidationThreshold: '0.83',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '447610.86387521695556535',
            },
            {
              token: {
                chainId: 1,
                address: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
                decimals: 18,
                symbol: 'USDP',
                name: 'Pax Dollar',
              },
              price: '1.0104264',
              balance: '0',
              apy: '0.05535400343460365121',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '317060.653267909604512311',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 1,
                address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                decimals: 18,
                symbol: 'DAI',
                name: 'Dai Stablecoin',
              },
              price: '1.00070489',
              balance: '0',
              apy: '0.06039649841678908996',
              grossApy: '0.06039649841678908996',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '62331886.427849404286730774',
            },
            {
              token: {
                chainId: 1,
                address: '0x0000000000000000000000000000000000000000',
                decimals: 18,
                symbol: 'ETH',
                name: 'Ethereum',
              },
              price: '2242.39893',
              balance: '20669.514211273436654689',
              apy: '0.00916817498078637062',
              grossApy: '0.00916817498078637062',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '132524.853230185675699358',
            },
            {
              token: {
                chainId: 1,
                address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
                decimals: 18,
                symbol: 'FRAX',
                name: 'Frax',
              },
              price: '1.00993502',
              balance: '0',
              apy: '0.14450408118649581654',
              grossApy: '0.14450408118649581654',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1059980.451652825654179698',
            },
            {
              token: {
                chainId: 1,
                address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd',
                decimals: 2,
                symbol: 'GUSD',
                name: 'Gemini dollar',
              },
              price: '0.99999999',
              balance: '0',
              apy: '0.02829120928712811107',
              grossApy: '0.02829120928712811107',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '556057.21',
            },
            {
              token: {
                chainId: 1,
                address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
                decimals: 18,
                symbol: 'LUSD',
                name: 'LUSD Stablecoin',
              },
              price: '0.99907345',
              balance: '0',
              apy: '0.02996184796985743881',
              grossApy: '0.02996184796985743881',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '328303.337041952294996842',
            },
            {
              token: {
                chainId: 1,
                address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                decimals: 6,
                symbol: 'USDC',
                name: 'USD Coin',
              },
              price: '1.00052179',
              balance: '0',
              apy: '0.09796037628587413794',
              grossApy: '0.09796037628587413794',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '297080725.553758',
            },
            {
              token: {
                chainId: 1,
                address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                decimals: 6,
                symbol: 'USDT',
                name: 'Tether USD',
              },
              price: '0.99311457',
              balance: '0',
              apy: '0.10457023515211070635',
              grossApy: '0.10457023515211070635',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '177273773.931094',
            },
            {
              token: {
                chainId: 1,
                address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                decimals: 8,
                symbol: 'WBTC',
                name: 'Wrapped BTC',
              },
              price: '42011.50322746',
              balance: '0',
              apy: '0.00094330871348293318',
              grossApy: '0.00094330871348293318',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '2618.36938773',
            },
            {
              token: {
                chainId: 1,
                address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
                decimals: 18,
                symbol: 'sUSD',
                name: 'Synth sUSD',
              },
              price: '0.99932685',
              balance: '0',
              apy: '0.02081794981150289325',
              grossApy: '0.02081794981150289325',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1374613.496566094944262286',
            },
            {
              token: {
                chainId: 1,
                address: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
                decimals: 18,
                symbol: 'USDP',
                name: 'Pax Dollar',
              },
              price: '1.0104264',
              balance: '0',
              apy: '0.05535400343460365121',
              grossApy: '0.05535400343460365121',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '256666.580963762144011205',
            },
          ],
        },
      },
      {
        chainId: common.ChainId.polygon,
        account: '0xFC168f61c862E59d598712F33D9a487dE387eA4A',
        blockTag: 51191189,
        expected: {
          chainId: 137,
          protocolId: 'aave-v2',
          marketId: 'polygon',
          utilization: '0.3685856393576075793',
          healthRate: '2.92177166424606475501',
          totalSupplyUSD: '6187.63383963095020048012547096',
          totalBorrowUSD: '181.29530249474694',
          supplies: [
            {
              token: {
                chainId: 137,
                address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
                decimals: 18,
                symbol: 'AAVE',
                name: 'Aave (PoS)',
              },
              price: '105.25610147',
              balance: '0',
              apy: '0',
              usageAsCollateralEnabled: true,
              ltv: '0.5',
              liquidationThreshold: '0.65',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '22611.10243785446899109',
            },
            {
              token: {
                chainId: 137,
                address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
                decimals: 18,
                symbol: 'DAI',
                name: '(PoS) Dai Stablecoin',
              },
              price: '0.99679794',
              balance: '0',
              apy: '0.12710541004444977537',
              usageAsCollateralEnabled: true,
              ltv: '0.75',
              liquidationThreshold: '0.8',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '10041889.244136207665022938',
            },
            {
              token: {
                chainId: 137,
                address: '0x0000000000000000000000000000000000001010',
                decimals: 18,
                symbol: 'MATIC',
                name: 'Matic Token',
              },
              price: '0.85300841',
              balance: '887.118163164367700056',
              apy: '0.00015134820365801307',
              usageAsCollateralEnabled: true,
              ltv: '0.65',
              liquidationThreshold: '0.7',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '9730349.206340911556404886',
            },
            {
              token: {
                chainId: 137,
                address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'USD Coin (PoS)',
              },
              price: '0.99664591',
              balance: '0',
              apy: '0.10613890696322769932',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.85',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '22837818.302823',
            },
            {
              token: {
                chainId: 137,
                address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
                decimals: 6,
                symbol: 'USDT',
                name: '(PoS) Tether USD',
              },
              price: '1.00213471',
              balance: '5419.345854',
              apy: '0.02085841506259266721',
              usageAsCollateralEnabled: false,
              ltv: '0',
              liquidationThreshold: '0',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '7365516.219938',
            },
            {
              token: {
                chainId: 137,
                address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
                decimals: 8,
                symbol: 'WBTC',
                name: '(PoS) Wrapped BTC',
              },
              price: '42314.45587845',
              balance: '0',
              apy: '0.00000380199312269635',
              usageAsCollateralEnabled: true,
              ltv: '0.7',
              liquidationThreshold: '0.75',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '1048.03062029',
            },
            {
              token: {
                chainId: 137,
                address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
                decimals: 18,
                symbol: 'WETH',
                name: 'Wrapped Ether',
              },
              price: '2247.22899356',
              balance: '0',
              apy: '0.00011636207541797941',
              usageAsCollateralEnabled: true,
              ltv: '0.8',
              liquidationThreshold: '0.825',
              isNotCollateral: false,
              supplyCap: '0',
              totalSupply: '24612.744802960406826559',
            },
          ],
          borrows: [
            {
              token: {
                chainId: 137,
                address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
                decimals: 18,
                symbol: 'DAI',
                name: '(PoS) Dai Stablecoin',
              },
              price: '0.99679794',
              balance: '0',
              apy: '0.12710541004444977537',
              grossApy: '0.12710541004444977537',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '7856725.927159881562061903',
            },
            {
              token: {
                chainId: 137,
                address: '0x0000000000000000000000000000000000001010',
                decimals: 18,
                symbol: 'MATIC',
                name: 'Matic Token',
              },
              price: '0.85300841',
              balance: '0',
              apy: '0.00015134820365801307',
              grossApy: '0.00015134820365801307',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '628705.023975555466478558',
            },
            {
              token: {
                chainId: 137,
                address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                decimals: 6,
                symbol: 'USDC.e',
                name: 'USD Coin (PoS)',
              },
              price: '0.99664591',
              balance: '0',
              apy: '0.10613890696322769932',
              grossApy: '0.10613890696322769932',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '18432000.009154',
            },
            {
              token: {
                chainId: 137,
                address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
                decimals: 6,
                symbol: 'USDT',
                name: '(PoS) Tether USD',
              },
              price: '1.00213471',
              balance: '180.909114',
              apy: '0.02085841506259266721',
              grossApy: '0.02085841506259266721',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '3877549.092597',
            },
            {
              token: {
                chainId: 137,
                address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
                decimals: 8,
                symbol: 'WBTC',
                name: '(PoS) Wrapped BTC',
              },
              price: '42314.45587845',
              balance: '0',
              apy: '0.00000380199312269635',
              grossApy: '0.00000380199312269635',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '16.04738225',
            },
            {
              token: {
                chainId: 137,
                address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
                decimals: 18,
                symbol: 'WETH',
                name: 'Wrapped Ether',
              },
              price: '2247.22899356',
              balance: '0',
              apy: '0.00011636207541797941',
              grossApy: '0.00011636207541797941',
              borrowMin: '0',
              borrowCap: '0',
              totalBorrow: '1679.126787526099215032',
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
