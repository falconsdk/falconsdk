import * as api from '@falcon/api';
import * as logics from '@falcon/logics';

// interface WithdrawCollateralFields {
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
// }

// interface WithdrawCollateralLogic {
//   rid: string;
//   fields: WithdrawCollateralFields;
// }

(async () => {
  const chainId = 1;
  const marketId = logics.compoundv3.MarketId.USDC;

  const tokenList = await api.falconsdk.compoundv3.getWithdrawCollateralTokenList(chainId);
  const asset = tokenList[marketId][0];
  console.log('asset :>> ', JSON.stringify(asset, null, 2));

  const withdrawCollateralLogic = await api.falconsdk.compoundv3.newWithdrawCollateralLogic({
    marketId,
    output: {
      token: asset,
      amount: '10',
    },
  });
  console.log('withdrawCollateralLogic :>> ', JSON.stringify(withdrawCollateralLogic, null, 2));
})();
