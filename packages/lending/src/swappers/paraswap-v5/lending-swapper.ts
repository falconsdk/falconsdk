import { ID, supportedChainIds } from './configs';
import { Swapper } from 'src/swapper';
import { SwapperQuoteParams } from 'src/swapper.type';
import * as apisdk from '@falcon/api';
import * as common from '@falcon/common';

export class LendingSwapper extends Swapper {
  static readonly supportedChainIds = supportedChainIds;

  readonly id = ID;
  readonly canCustomToken = false;

  static isSupported(chainId: number) {
    return this.supportedChainIds.includes(chainId);
  }

  private _tokens?: common.Token[];

  async tokens() {
    if (!this._tokens) {
      this._tokens = await apisdk.falconsdk.paraswapv5.getSwapTokenTokenList(this.chainId);
    }
    return this._tokens;
  }

  async quote(params: SwapperQuoteParams) {
    return apisdk.falconsdk.paraswapv5.getSwapTokenQuotation(this.chainId, { ...params, excludeDEXS: ['BalancerV2'] });
  }

  newSwapTokenLogic = apisdk.falconsdk.paraswapv5.newSwapTokenLogic;
}
