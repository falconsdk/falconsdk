import { ID, disabledDexIdsMap, supportedChainIds } from './configs';
import { Swapper } from 'src/swapper';
import { SwapperQuoteParams } from 'src/swapper.type';
import * as apisdk from '@falcon/api';
import * as common from '@falcon/common';
import * as core from '@falcon/core';

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
      this._tokens = await apisdk.falconsdk.openoceanv2.getSwapTokenTokenList(this.chainId);
    }
    return this._tokens;
  }

  async quote(params: SwapperQuoteParams) {
    if (core.isTokenToTokenExactInParams(params)) {
      return apisdk.falconsdk.openoceanv2.getSwapTokenQuotation(this.chainId, {
        ...params,
        disabledDexIds: disabledDexIdsMap[this.chainId],
      });
    }
    // openocean can't quote with output, so using exact in to get exact out quotation
    else {
      const quotation = await apisdk.falconsdk.openoceanv2.getSwapTokenQuotation(this.chainId, {
        input: params.output,
        tokenOut: params.tokenIn,
        disabledDexIds: disabledDexIdsMap[this.chainId],
      });
      quotation.input = quotation.output;
      quotation.output = params.output;

      return quotation;
    }
  }

  newSwapTokenLogic = apisdk.falconsdk.openoceanv2.newSwapTokenLogic;
}
