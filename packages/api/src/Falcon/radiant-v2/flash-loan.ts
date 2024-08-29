import { FlashLoanFields, FlashLoanLogic } from 'src/types';
import * as common from '@falcon/common';
import { getProtocolTokenList, quote } from 'src/api';
import * as logics from '@falcon/logics';
import { v4 as uuid } from 'uuid';

export type FlashLoanParams = common.Declasifying<logics.radiantv2.FlashLoanLogicParams>;

export async function getFlashLoanTokenList(chainId: number): Promise<logics.radiantv2.FlashLoanLogicTokenList> {
  return getProtocolTokenList(chainId, logics.radiantv2.FlashLoanLogic.rid);
}

export async function getFlashLoanQuotation(
  chainId: number,
  params: FlashLoanParams
): Promise<logics.radiantv2.FlashLoanLogicQuotation> {
  return quote(chainId, logics.radiantv2.FlashLoanLogic.rid, params);
}

export function newFlashLoanLogic(fields: FlashLoanFields): FlashLoanLogic {
  return { rid: logics.radiantv2.FlashLoanLogic.rid, fields };
}

export function newFlashLoanLogicPair(loans: FlashLoanFields['loans']): [FlashLoanLogic, FlashLoanLogic] {
  const id = uuid();
  return [newFlashLoanLogic({ id, loans, isLoan: true }), newFlashLoanLogic({ id, loans, isLoan: false })];
}
