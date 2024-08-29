import * as common from '@falcon/common';
import * as logics from '@falcon/logics';

export const ID = 'openocean-v2';

export const supportedChainIds = logics.openoceanv2.SwapTokenLogic.supportedChainIds;

export const disabledDexIdsMap: { [key in number]?: string } = {
  [common.ChainId.gnosis]: '6', // BalancerV2
};
