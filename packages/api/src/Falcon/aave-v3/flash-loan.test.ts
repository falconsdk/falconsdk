import { FlashLoanParams, getFlashLoanQuotation, getFlashLoanTokenList } from './flash-loan';
import * as common from '@falcon/common';
import { expect } from 'chai';
import * as logics from '@falcon/logics';

describe('AaveV3 FlashLoanLogic', function () {
  context('Test getTokenList', async function () {
    logics.aavev3.FlashLoanLogic.supportedChainIds.forEach((chainId) => {
      it(`network: ${common.toNetworkId(chainId)}`, async function () {
        const tokenList = await getFlashLoanTokenList(chainId);
        expect(tokenList).to.have.lengthOf.above(0);
      });
    });
  });

  context('Test getQuotation', async function () {
    const chainId = common.ChainId.mainnet;

    const testCases: FlashLoanParams[] = [
      {
        loans: [
          { token: logics.aavev3.mainnetTokens.WETH, amount: '1' },
          { token: logics.aavev3.mainnetTokens.USDC, amount: '1' },
        ],
      },
      {
        repays: [
          { token: logics.aavev3.mainnetTokens.WETH, amount: '1' },
          { token: logics.aavev3.mainnetTokens.USDC, amount: '1' },
        ],
      },
      {
        loans: [
          { token: logics.aavev3.mainnetTokens.WBTC, amount: '1' },
          { token: logics.aavev3.mainnetTokens.DAI, amount: '1' },
        ],
      },
      {
        repays: [
          { token: logics.aavev3.mainnetTokens.WBTC, amount: '1' },
          { token: logics.aavev3.mainnetTokens.DAI, amount: '1' },
        ],
      },
    ];

    testCases.forEach((params, i) => {
      it(`case ${i + 1}`, async function () {
        const quotation = await getFlashLoanQuotation(chainId, params);
        expect(quotation).to.include.all.keys('loans', 'repays', 'feeBps');
      });
    });
  });
});
