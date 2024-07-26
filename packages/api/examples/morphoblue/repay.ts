import * as api from '@falcon/api';

// interface RepayParams {
//   marketId: string;
//   tokenIn: {
//     chainId: number;
//     address: string;
//     decimals: number;
//     symbol: string;
//     name: string;
//   };
//   borrower: string;
// }

// interface RepayFields {
//   marketId: string;
//   input: {
//     token: {
//       chainId: number;
//       address: string;
//       decimals: number;
//       symbol: string;
//       name: string;
//     };
//     amount: string;
//   };
//   borrower: string;
// }

// interface RepayLogic {
//   rid: string;
//   fields: RepayFields;
// }

(async () => {
  const chainId = 1;
  const marketId = '0xb323495f7e4148be5643a4ea4a8221eef163e4bccfdedc2a6f4696baacbc86cc';
  const account = '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa';

  const tokenList = await api.falconsdk.morphoblue.getRepayTokenList(chainId);
  const loanToken = tokenList[marketId][0];
  console.log('loanToken :>> ', JSON.stringify(loanToken, null, 2));

  const repayQuotation = await api.falconsdk.morphoblue.getRepayQuotation(chainId, {
    marketId,
    tokenIn: loanToken,
    borrower: account,
  });
  console.log('repayQuotation :>> ', JSON.stringify(repayQuotation, null, 2));

  const repayLogic = await api.falconsdk.morphoblue.newRepayLogic(repayQuotation);
  console.log('repayLogic :>> ', JSON.stringify(repayLogic, null, 2));
})();
