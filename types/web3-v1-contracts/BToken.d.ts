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

export type Approval = ContractEventLog<{
  src: string;
  dst: string;
  amt: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  src: string;
  dst: string;
  amt: string;
  0: string;
  1: string;
  2: string;
}>;

export interface BToken extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): BToken;
  clone(): BToken;
  methods: {
    VERSION_NUMBER(): NonPayableTransactionObject<string>;

    name(): NonPayableTransactionObject<string>;

    symbol(): NonPayableTransactionObject<string>;

    decimals(): NonPayableTransactionObject<string>;

    allowance(src: string, dst: string): NonPayableTransactionObject<string>;

    balanceOf(whom: string): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    approve(
      dst: string,
      amt: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    increaseApproval(
      dst: string,
      amt: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    decreaseApproval(
      dst: string,
      amt: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transfer(
      dst: string,
      amt: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      src: string,
      dst: string,
      amt: number | string | BN
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
