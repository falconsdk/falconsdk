import { TokenObject } from 'src/tokens';
import data from './data.json';

export interface Network {
  id: string;
  chainId: number;
  name: string;
  explorerUrl: string;
  rpcUrl: string;
  nativeToken: TokenObject;
  wrappedNativeToken: TokenObject;
  multicall3Address: string;
}

export const networks: Network[] = data;

export const [networkMap, networkMapById] = networks.reduce(
  (accumulator, network) => {
    accumulator[0][network.chainId] = network;
    accumulator[1][network.id] = network;
    return accumulator;
  },
  [{}, {}] as [Record<number, Network>, Record<string, Network>]
);

export function setNetwork(chainId: number, network: Partial<Network>) {
  const index = networks.findIndex((network) => network.chainId === chainId);
  if (index > -1) {
    networks[index] = { ...networks[index], ...network };
    networkMap[chainId] = { ...networkMap[chainId], ...network };
  } else {
    networks.push(network as Network);
    networkMap[chainId] = network as Network;
  }
}

export function getNetwork(chainId: number) {
  return networkMap[chainId];
}

export function toNetworkId(chainId: number) {
  return getNetwork(chainId).id;
}

export function getNetworkById(networkId: string) {
  return networkMapById[networkId];
}

export function toChainId(networkId: string) {
  return getNetworkById(networkId).chainId;
}

export enum ChainId {
  mainnet = 1,
  optimism = 10,
  bnb = 56,
  gnosis = 100,
  polygon = 137,
  zksync = 324,
  metis = 1088,
  polygonZkevm = 1101,
  base = 8453,
  iota = 8822,
  arbitrum = 42161,
  avalanche = 43114,
}

export enum NetworkId {
  mainnet = 'mainnet',
  optimism = 'optimism',
  bnb = 'bnb',
  gnosis = 'gnosis',
  polygon = 'polygon',
  zksync = 'zksync',
  metis = 'metis',
  polygonZkevm = 'polygonZkevm',
  base = 'base',
  iota = 'iota',
  arbitrum = 'arbitrum',
  avalanche = 'avalanche',
}

export function isSupportedChainId(chainId: number) {
  return !!networkMap[chainId];
}

export function isSupportedNetworkId(networkId: string) {
  return networks.some((network) => network.id == networkId);
}

export enum ExplorerType {
  tx = 'tx',
  address = 'address',
  token = 'token',
}

export function newExplorerUrl(chainId: number, type: 'tx' | 'address' | 'token', data: string) {
  return `${getNetwork(chainId).explorerUrl}${type}/${data}`;
}
