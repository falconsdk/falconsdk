import * as common from '@falcon/common';
import { expect } from 'chai';
import { getWithdrawCollateralTokenList } from './withdraw-collateral';
import * as logics from '@falcon/logics';

describe('CompoundV3 WithdrawCollateralLogic', function () {
  context('Test getTokenList', async function () {
    logics.compoundv3.WithdrawCollateralLogic.supportedChainIds.forEach((chainId) => {
      it(`network: ${common.toNetworkId(chainId)}`, async function () {
        const tokenList = await getWithdrawCollateralTokenList(chainId);
        const marketIds = Object.keys(tokenList);
        expect(marketIds).to.have.lengthOf.above(0);
        for (const marketId of marketIds) {
          expect(tokenList[marketId]).to.have.lengthOf.above(0);
        }
      });
    });
  });
});
