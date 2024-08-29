import * as api from '@falcon/api';
import * as logics from '@falcon/logics';

// interface RepayParams {
//   tokenIn: {
//     chainId: number;
//     address: string;
//     decimals: number;
//     symbol: string;
//     name: string;
//   };
//   borrower: string;
//   interestRateMode: logics.radiantv2.InterestRateMode;
// }

// interface RepayFields {
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
//   interestRateMode: logics.radiantv2.InterestRateMode;
// }

// interface RepayLogic {
//   rid: string;
//   fields: RepayFields;
// }

(async () => {
  const chainId = 42161;
  const account = '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa';

  const tokenList = await api.falconsdk.radiantv2.getRepayTokenList(chainId);
  const underlyingToken = tokenList[0];
  console.log('underlyingToken :>> ', JSON.stringify(underlyingToken, null, 2));

  const repayQuotation = await api.falconsdk.radiantv2.getRepayQuotation(chainId, {
    borrower: account,
    tokenIn: underlyingToken,
    interestRateMode: logics.radiantv2.InterestRateMode.variable,
  });
  console.log('repayQuotation :>> ', JSON.stringify(repayQuotation, null, 2));

  const repayLogic = await api.falconsdk.radiantv2.newRepayLogic(repayQuotation);
  console.log('repayLogic :>> ', JSON.stringify(repayLogic, null, 2));
})();
