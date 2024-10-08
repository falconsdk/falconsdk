import { RouterData } from './types';
import { buildRouterTransactionRequest, estimateRouterData, getProtocolTokenList, getfalconsdk, quote } from './api';
import * as common from '@falcon/common';
import { expect } from 'chai';
import * as logics from '@falcon/logics';
import { mainnetTokens } from '@falcon/test-helpers';
import * as utility from 'src/falconsdk/utility';

describe('API client', function () {
  it('Test getfalconsdk', async function () {
    const falconsdk = await getfalconsdk();
    expect(falconsdk).to.have.lengthOf.above(0);
    for (const protocol of falconsdk) {
      expect(protocol).to.include.all.keys('id', 'logics');
      expect(protocol.logics).to.have.lengthOf.above(0);
      for (const logic of protocol.logics) {
        expect(logic).to.include.all.keys('id', 'supportedChainIds');
      }
    }
  });

  it('Test getProtocolTokenList', async function () {
    const tokenList = await getProtocolTokenList(common.ChainId.mainnet, logics.uniswapv3.SwapTokenLogic.rid);
    expect(tokenList).to.have.lengthOf.above(0);
  });

  it('Test quote', async function () {
    const params = { input: new common.TokenAmount(mainnetTokens.ETH, '1'), tokenOut: mainnetTokens.USDC };
    const quotation = await quote(common.ChainId.mainnet, logics.uniswapv3.SwapTokenLogic.rid, params);
    expect(quotation).to.include.all.keys('tradeType', 'input', 'output');
    expect(quotation).to.have.any.keys('path', 'fee');
  });

  const routerData: RouterData = {
    chainId: common.ChainId.mainnet,
    account: '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa',
    logics: [
      utility.newSendTokenLogic({
        input: { token: mainnetTokens.ETH, amount: '1' },
        recipient: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      }),
      utility.newSendTokenLogic({
        input: { token: mainnetTokens.USDC, amount: '1' },
        recipient: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      }),
    ],
  };

  it('Test estimateRouterData', async function () {
    const estimateResult = await estimateRouterData(routerData);
    expect(estimateResult).to.include.all.keys('funds', 'balances', 'fees', 'approvals', 'permitData');
  });

  it('Test estimateRouterData with approve permit2Type', async function () {
    const estimateResult = await estimateRouterData(routerData, { permit2Type: 'approve' });
    expect(estimateResult).to.include.all.keys('funds', 'balances', 'fees', 'approvals');
  });

  it('Test buildRouterTransactionRequest', async function () {
    const transactionRequest = await buildRouterTransactionRequest(routerData);
    expect(transactionRequest).to.include.all.keys('to', 'data', 'value');
  });
});
