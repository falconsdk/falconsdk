import { Logic } from 'src/types';
import * as common from '@falcon/common';
import { getProtocolTokenList, quote } from 'src/api';
import * as logics from '@falcon/logics';

export type SwapTokenParams = common.Declasifying<logics.paraswapv5.SwapTokenLogicParams>;

export type SwapTokenFields = common.Declasifying<logics.paraswapv5.SwapTokenLogicFields>;

export type SwapTokenLogic = Logic<SwapTokenFields>;

export async function getSwapTokenTokenList(chainId: number): Promise<logics.paraswapv5.SwapTokenLogicTokenList> {
  return getProtocolTokenList(chainId, logics.paraswapv5.SwapTokenLogic.rid);
}

export async function getSwapTokenQuotation(
  chainId: number,
  params: SwapTokenParams
): Promise<logics.paraswapv5.SwapTokenLogicFields> {
  return quote(chainId, logics.paraswapv5.SwapTokenLogic.rid, params);
}

export function newSwapTokenLogic(fields: SwapTokenFields): SwapTokenLogic {
  return { rid: logics.paraswapv5.SwapTokenLogic.rid, fields };
}
