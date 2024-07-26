import * as api from '@falcon/api';

// import * as common from '@falcon/common';

// interface FlashLoanLogicFields {
//   id: string;
//   outputs: common.TokenAmounts;
//   isLoan: boolean;
// }

// interface FlashLoanFields {
//   id: string;
//   outputs: {
//     token: {
//       chainId: number;
//       address: string;
//       decimals: number;
//       symbol: string;
//       name: string;
//     };
//     amount: string;
//   }[];
//   isLoan: boolean;
// }

// interface FlashLoanLogic {
//   rid: string;
//   fields: FlashLoanFields;
// }

(async () => {
  const chainId = 1;

  const tokenList = await api.falconsdk.spark.getFlashLoanTokenList(chainId);
  const underlyingToken = tokenList[0];
  console.log('underlyingToken :>> ', JSON.stringify(underlyingToken, null, 2));

  const outputs = [
    {
      token: underlyingToken,
      amount: '10000',
    },
  ];

  const [flashLoanLoanLogic, flashLoanRepayLogic] = api.falconsdk.spark.newFlashLoanLogicPair(outputs);
  const logics = [flashLoanLoanLogic];
  // logics.push(swapLogic)
  // logics.push(supplyLogic)
  // logics.push(...)
  logics.push(flashLoanRepayLogic);
  console.log('logics :>> ', JSON.stringify(logics, null, 2));
})();
