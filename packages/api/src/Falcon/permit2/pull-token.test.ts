import * as common from '@falcon/common';
import { expect } from 'chai';
import { getPullTokenTokenList } from './pull-token';
import * as logics from '@falcon/logics';

describe('Permit2 PullTokenLogic', function () {
  context('Test getTokenList', async function () {
    logics.permit2.PullTokenLogic.supportedChainIds.forEach((chainId) => {
      it(`network: ${common.toNetworkId(chainId)}`, async function () {
        const tokenList = await getPullTokenTokenList(chainId);
        expect(tokenList).to.have.lengthOf.above(0);
      });
    });
  });
});
