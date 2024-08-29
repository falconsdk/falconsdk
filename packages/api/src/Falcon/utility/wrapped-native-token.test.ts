import {
  WrappedNativeTokenParams,
  getWrappedNativeTokenQuotation,
  getWrappedNativeTokenTokenList,
} from './wrapped-native-token';
import * as common from '@falcon/common';
import { expect } from 'chai';
import * as logics from '@falcon/logics';
import { mainnetTokens } from '@falcon/test-helpers';

describe('Utility WrappedNativeTokenLogic', function () {
  context('Test getTokenList', async function () {
    logics.utility.WrappedNativeTokenLogic.supportedChainIds.forEach((chainId) => {
      it(`network: ${common.toNetworkId(chainId)}`, async function () {
        const tokenList = await getWrappedNativeTokenTokenList(chainId);
        expect(tokenList).to.have.lengthOf.above(0);
      });
    });
  });

  context('Test getQuotation', async function () {
    const chainId = common.ChainId.mainnet;

    const testCases: WrappedNativeTokenParams[] = [
      {
        input: { token: mainnetTokens.ETH, amount: '1' },
        tokenOut: mainnetTokens.WETH,
      },
      {
        input: { token: mainnetTokens.WETH, amount: '1' },
        tokenOut: mainnetTokens.ETH,
      },
    ];

    testCases.forEach((params, i) => {
      it(`case ${i + 1}`, async function () {
        const quotation = await getWrappedNativeTokenQuotation(chainId, params);
        expect(quotation).to.include.all.keys('input', 'output');
      });
    });
  });
});
