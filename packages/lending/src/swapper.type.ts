import * as core from '@falcon/core';

export type SwapperQuoteParams = core.TokenToTokenParams<{ slippage?: number }>;

export type SwapperQuoteFields = core.TokenToTokenExactInFields<{ slippage?: number }>;
