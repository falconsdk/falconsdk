import { ELASTIC_ADDRESS } from './constants';
import { getNetwork } from '../networks';
import { utils } from 'ethers';

export interface TokenObject {
  chainId: number;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  logoUri?: string;
}

export class Token {
  readonly chainId: number;
  readonly address: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly name: string;
  readonly logoUri?: string;

  constructor(chainId: number, address: string, decimals: number, symbol: string, name: string, logoUri?: string);
  constructor(tokenObject: TokenObject);
  constructor(arg0: any, ...otherArgs: any[]) {
    if (isTokenObject(arg0)) {
      this.chainId = arg0.chainId;
      this.address = utils.getAddress(arg0.address);
      this.decimals = arg0.decimals;
      this.symbol = arg0.symbol;
      this.name = arg0.name;
      this.logoUri = arg0.logoUri;
    } else {
      this.chainId = arg0;
      this.address = utils.getAddress(otherArgs[0]);
      this.decimals = otherArgs[1];
      this.symbol = otherArgs[2];
      this.name = otherArgs[3];
      this.logoUri = otherArgs[4];
    }
  }

  static from(token: TokenTypes) {
    return isToken(token) ? token : new Token(token);
  }

  static isNative(chainId: number, address: string): boolean;
  static isNative(token: TokenTypes): boolean;
  static isNative(arg0: any, ...otherArgs: any[]) {
    let chainId: number;
    let address: string;
    if (isTokenTypes(arg0)) {
      chainId = arg0.chainId;
      address = arg0.address;
    } else {
      chainId = arg0;
      address = otherArgs[0];
    }
    return getNetwork(chainId).nativeToken.address === utils.getAddress(address);
  }

  static isWrapped(chainId: number, address: string): boolean;
  static isWrapped(token: TokenTypes): boolean;
  static isWrapped(arg0: any, ...otherArgs: any[]) {
    let chainId: number;
    let address: string;
    if (isTokenTypes(arg0)) {
      chainId = arg0.chainId;
      address = arg0.address;
    } else {
      chainId = arg0;
      address = otherArgs[0];
    }
    return getNetwork(chainId).wrappedNativeToken.address === utils.getAddress(address);
  }

  static getAddress(tokenOrAddress: TokenOrAddress) {
    let address: string;
    if (isTokenTypes(tokenOrAddress)) {
      address = tokenOrAddress.address;
    } else {
      address = tokenOrAddress;
    }
    return utils.getAddress(address);
  }

  is(token: TokenTypes) {
    return this.chainId === token.chainId && this.address === utils.getAddress(token.address);
  }

  get isNative() {
    return this.is(getNetwork(this.chainId).nativeToken);
  }

  get isWrapped() {
    return this.is(getNetwork(this.chainId).wrappedNativeToken);
  }

  get wrapped(): Token {
    return this.isNative ? new Token(getNetwork(this.chainId).wrappedNativeToken) : this;
  }

  get unwrapped(): Token {
    return this.isWrapped ? new Token(getNetwork(this.chainId).nativeToken) : this;
  }

  get elasticAddress() {
    return this.isNative ? ELASTIC_ADDRESS : this.address;
  }

  sortsBefore(token: TokenTypes) {
    return this.wrapped.address.toLowerCase() < Token.from(token).wrapped.address.toLowerCase();
  }

  toObject(): TokenObject {
    return {
      chainId: this.chainId,
      address: this.address,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
      ...(this.logoUri ? { logoUri: this.logoUri } : {}),
    };
  }
}

export type TokenTypes = TokenObject | Token;

export type TokenOrAddress = TokenTypes | string;

export function isTokenObject(v: any): v is TokenObject {
  return (
    !isToken(v) &&
    typeof v === 'object' &&
    typeof v.chainId === 'number' &&
    typeof v.address === 'string' &&
    typeof v.decimals === 'number' &&
    typeof v.symbol === 'string' &&
    typeof v.name === 'string' &&
    (!v.logoUri || typeof v.logoUri === 'string')
  );
}

export function isToken(v: any): v is Token {
  return v instanceof Token;
}

export function isTokenTypes(v: any): v is TokenTypes {
  return isToken(v) || isTokenObject(v);
}
