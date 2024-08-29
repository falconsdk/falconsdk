import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { arbitrumTokens } from 'src/fixtures';
import { claimToken } from 'src/utils/faucet';
import * as common from '@falcon/common';
import { expect } from 'chai';
import { getChainId } from 'src/utils/network';
import hre from 'hardhat';
import { snapshotAndRevertEach } from 'src/hooks';

describe('arbitrum: Test faucet claim', function () {
  let chainId: number;
  let user: SignerWithAddress;

  before(async function () {
    [, user] = await hre.ethers.getSigners();
    chainId = await getChainId();
  });

  snapshotAndRevertEach();

  const testCases: { tokenOrAddress: common.TokenOrAddress; amount: string }[] = [
    { tokenOrAddress: arbitrumTokens.ETH, amount: '1' },
    { tokenOrAddress: arbitrumTokens.WETH, amount: '1' },
    { tokenOrAddress: arbitrumTokens.USDC, amount: '1' },
    { tokenOrAddress: arbitrumTokens['USDC.e'], amount: '1' },
    { tokenOrAddress: arbitrumTokens.WBTC, amount: '1' },
  ];

  testCases.forEach(({ tokenOrAddress, amount }) => {
    it(`claim ${common.isTokenTypes(tokenOrAddress) ? tokenOrAddress.symbol : tokenOrAddress}`, async function () {
      await claimToken(chainId, user.address, tokenOrAddress, amount);
      await expect(user.address).to.changeBalance(tokenOrAddress, amount);
    });
  });
});
