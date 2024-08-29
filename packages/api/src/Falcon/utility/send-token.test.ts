import * as common from '@falcon/common';
import { expect } from 'chai';
import { getSendTokenTokenList } from './send-token';
import * as logics from '@falcon/logics';

describe('Utility SendTokenLogic', function () {
  context('Test getTokenList', async function () {
    logics.utility.SendTokenLogic.supportedChainIds.forEach((chainId) => {
      it(`network: ${common.toNetworkId(chainId)}`, async function () {
        const tokenList = await getSendTokenTokenList(chainId);
        expect(tokenList).to.have.lengthOf.above(0);
      });
    });
  });
});
