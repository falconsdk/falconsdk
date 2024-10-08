import * as api from '@falcon/api';

// interface SendTokenFields {
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
//   recipient: string;
// }

// interface SendTokenLogic {
//   rid: string;
//   fields: SendTokenFields;
// }

(async () => {
  const chainId = 1;

  const tokenList = await api.falconsdk.utility.getSendTokenTokenList(chainId);
  const tokenIn = tokenList[0];
  console.log('tokenIn :>> ', JSON.stringify(tokenIn, null, 2));

  const sendTokenLogic = await api.falconsdk.utility.newSendTokenLogic({
    input: {
      token: tokenIn,
      amount: '10',
    },
    recipient: '0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa',
  });
  console.log('sendTokenLogic :>> ', JSON.stringify(sendTokenLogic, null, 2));
})();
