import * as common from '@falcon/common';

if (process.env.MAINNET_RPC_URL) {
  common.setNetwork(common.ChainId.mainnet, { rpcUrl: process.env.MAINNET_RPC_URL });
}
