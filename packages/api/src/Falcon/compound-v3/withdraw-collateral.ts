import { Logic } from 'src/types';
import * as common from '@falcon/common';
import { getProtocolTokenList } from 'src/api';
import * as logics from '@falcon/logics';

export type WithdrawCollateralFields = common.Declasifying<logics.compoundv3.WithdrawCollateralLogicFields>;

export type WithdrawCollateralLogic = Logic<WithdrawCollateralFields>;

export async function getWithdrawCollateralTokenList(
  chainId: number
): Promise<logics.compoundv3.WithdrawCollateralLogicTokenList> {
  return getProtocolTokenList(chainId, logics.compoundv3.WithdrawCollateralLogic.rid);
}

export function newWithdrawCollateralLogic(fields: WithdrawCollateralFields): WithdrawCollateralLogic {
  return { rid: logics.compoundv3.WithdrawCollateralLogic.rid, fields };
}
