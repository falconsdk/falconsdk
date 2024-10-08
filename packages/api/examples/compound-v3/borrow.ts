import * as api from '@falcon/api';
import * as logics from '@falcon/logics';

// interface BorrowFields {
//   marketId: string;
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
  const marketId = logics.compoundv3.MarketId.USDC;

  const tokenList = await api.falconsdk.compoundv3.getBorrowTokenList(chainId);
  const baseToken = tokenList[marketId][0];
  console.log('baseToken :>> ', JSON.stringify(baseToken, null, 2));

  const borrowLogic = await api.falconsdk.compoundv3.newBorrowLogic({
    marketId,
    output: {
      token: baseToken,
      amount: '10',
    },
  });
  console.log('borrowLogic :>> ', JSON.stringify(borrowLogic, null, 2));
})();
