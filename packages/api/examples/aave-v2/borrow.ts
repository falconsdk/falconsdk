import * as api from '@falcon/api';
import * as logics from '@falcon/logics';

// interface BorrowFields {
//   interestRateMode: logics.aavev2.InterestRateMode;
//   output: {
//     token: {
//       chainId: number;
//       address: string;
//       decimals: number;
//       symbol: string;
//       name: string;
//     };
//     amount: string;
//   };
// }

// interface BorrowLogic {
//   rid: string;
//   fields: BorrowFields;
// }

(async () => {
  const chainId = 1;

  const tokenList = await api.falconsdk.aavev2.getBorrowTokenList(chainId);
  const underlyingToken = tokenList[0];
  console.log('underlyingToken :>> ', JSON.stringify(underlyingToken, null, 2));

  const borrowLogic = await api.falconsdk.aavev2.newBorrowLogic({
    interestRateMode: logics.aavev2.InterestRateMode.variable,
    output: {
      token: underlyingToken,
      amount: '10',
    },
  });
  console.log('borrowLogic :>> ', JSON.stringify(borrowLogic, null, 2));
})();
