import * as common from '@falcon/common';
import { expect } from 'chai';
import { getSupplyCollateralTokenList } from './supply-collateral';
import * as logics from '@falcon/logics';

describe('Morpho SupplyCollateralLogic', function () {
  context('Test getTokenList', async function () {
    logics.morphoblue.SupplyCollateralLogic.supportedChainIds.forEach((chainId) => {
      it(`network: ${common.toNetworkId(chainId)}`, async function () {
        const tokenList = await getSupplyCollateralTokenList(chainId);
        const marketIds = Object.keys(tokenList);
        expect(marketIds).to.have.lengthOf.above(0);
        for (const marketId of marketIds) {
          expect(tokenList[marketId]).to.have.lengthOf.above(0);
        }
      });
    });
  });
});
