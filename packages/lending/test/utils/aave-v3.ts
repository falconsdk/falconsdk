import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { approve } from '@falcon/test-helpers';
import * as common from '@falcon/common';
import { defaultInterestRateMode } from 'src/protocol.type';
import { expect } from 'chai';
import hre from 'hardhat';
import * as logics from '@falcon/logics';

export async function supply(chainId: number, user: SignerWithAddress, tokenAmount: common.TokenAmount) {
  const service = new logics.aavev3.Service(chainId, hre.ethers.provider);
  const lendingPoolAddress = await service.getPoolAddress();
  await approve(user, lendingPoolAddress, tokenAmount);
  await expect(
    logics.aavev3.Pool__factory.connect(lendingPoolAddress, user).supply(
      tokenAmount.token.address,
      tokenAmount.amountWei,
      user.address,
      0
    )
  ).to.not.be.reverted;
}
export async function borrow(chainId: number, user: SignerWithAddress, tokenAmount: common.TokenAmount) {
  const service = new logics.aavev3.Service(chainId, hre.ethers.provider);
  const lendingPoolAddress = await service.getPoolAddress();
  await expect(
    logics.aavev3.Pool__factory.connect(lendingPoolAddress, user).borrow(
      tokenAmount.token.address,
      tokenAmount.amountWei,
      defaultInterestRateMode,
      0,
      user.address
    )
  ).to.not.be.reverted;
}

export function toVariableDebtToken(underlyingToken: common.Token) {
  switch (underlyingToken.address) {
    case common.mainnetTokens.USDC.address:
      return '0x72E95b8931767C79bA4EeE721354d6E99a61D004'; // variableDebtEthUSDC
    case common.mainnetTokens.DAI.address:
      return '0xcF8d0c70c850859266f5C338b38F9D663181C314'; // variableDebtEthDAI
    default:
      return undefined;
  }
}
