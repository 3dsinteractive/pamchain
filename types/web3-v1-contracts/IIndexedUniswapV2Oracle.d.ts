/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface IIndexedUniswapV2Oracle extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): IIndexedUniswapV2Oracle;
  clone(): IIndexedUniswapV2Oracle;
  methods: {
    updatePrice(token: string): NonPayableTransactionObject<boolean>;

    updatePrices(tokens: string[]): NonPayableTransactionObject<boolean[]>;

    hasPriceObservationInWindow(
      token: string,
      priceKey: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    getPriceObservationInWindow(
      token: string,
      priceKey: number | string | BN
    ): NonPayableTransactionObject<[string, string, string]>;

    getPriceObservationsInRange(
      token: string,
      timeFrom: number | string | BN,
      timeTo: number | string | BN
    ): NonPayableTransactionObject<[string, string, string][]>;

    canUpdatePrice(token: string): NonPayableTransactionObject<boolean>;

    canUpdatePrices(tokens: string[]): NonPayableTransactionObject<boolean[]>;

    computeTwoWayAveragePrice(
      token: string,
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<[string, string]>;

    computeAverageTokenPrice(
      token: string,
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<[string]>;

    computeAverageEthPrice(
      token: string,
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<[string]>;

    computeTwoWayAveragePrices(
      tokens: string[],
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<[string, string][]>;

    computeAverageTokenPrices(
      tokens: string[],
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<[string][]>;

    computeAverageEthPrices(
      tokens: string[],
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<[string][]>;

    "computeAverageEthForTokens(address[],uint256[],uint256,uint256)"(
      tokens: string[],
      tokenAmounts: (number | string | BN)[],
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    "computeAverageEthForTokens(address,uint256,uint256,uint256)"(
      token: string,
      tokenAmount: number | string | BN,
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<string>;

    "computeAverageTokensForEth(address[],uint256[],uint256,uint256)"(
      tokens: string[],
      wethAmounts: (number | string | BN)[],
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    "computeAverageTokensForEth(address,uint256,uint256,uint256)"(
      token: string,
      wethAmount: number | string | BN,
      minTimeElapsed: number | string | BN,
      maxTimeElapsed: number | string | BN
    ): NonPayableTransactionObject<string>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
