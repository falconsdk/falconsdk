/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface PriceOracleInterface extends utils.Interface {
  functions: {
    'getAssetPrice(address)': FunctionFragment;
    'getAssetsPrices(address[])': FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: 'getAssetPrice' | 'getAssetsPrices'): FunctionFragment;

  encodeFunctionData(functionFragment: 'getAssetPrice', values: [string]): string;
  encodeFunctionData(functionFragment: 'getAssetsPrices', values: [string[]]): string;

  decodeFunctionResult(functionFragment: 'getAssetPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getAssetsPrices', data: BytesLike): Result;

  events: {};
}

export interface PriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PriceOracleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getAssetPrice(asset: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getAssetsPrices(assets: string[], overrides?: CallOverrides): Promise<[BigNumber[]]>;
  };

  getAssetPrice(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

  getAssetsPrices(assets: string[], overrides?: CallOverrides): Promise<BigNumber[]>;

  callStatic: {
    getAssetPrice(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    getAssetsPrices(assets: string[], overrides?: CallOverrides): Promise<BigNumber[]>;
  };

  filters: {};

  estimateGas: {
    getAssetPrice(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    getAssetsPrices(assets: string[], overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getAssetPrice(asset: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAssetsPrices(assets: string[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
