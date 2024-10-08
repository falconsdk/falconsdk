import { Logic } from 'src/types';
import * as common from '@falcon/common';
import { getProtocolTokenList } from 'src/api';
import * as logics from '@falcon/logics';

export type SupplyCollateralFields = common.Declasifying<logics.compoundv3.SupplyCollateralLogicFields>;

export type SupplyCollateralLogic = Logic<SupplyCollateralFields>;

export async function getSupplyCollateralTokenList(
  chainId: number
): Promise<logics.compoundv3.SupplyCollateralLogicTokenList> {
  return getProtocolTokenList(chainId, logics.compoundv3.SupplyCollateralLogic.rid);
}

export function newSupplyCollateralLogic(fields: SupplyCollateralFields): SupplyCollateralLogic {
  return { rid: logics.compoundv3.SupplyCollateralLogic.rid, fields };
}
