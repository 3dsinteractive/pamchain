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

export type DeploymentApprovalGranted = ContractEventLog<{
  deployer: string;
  0: string;
}>;
export type DeploymentApprovalRevoked = ContractEventLog<{
  deployer: string;
  0: string;
}>;
export type ManyToOne_ImplementationCreated = ContractEventLog<{
  implementationID: string;
  implementationAddress: string;
  0: string;
  1: string;
}>;
export type ManyToOne_ImplementationLocked = ContractEventLog<{
  implementationID: string;
  0: string;
}>;
export type ManyToOne_ImplementationUpdated = ContractEventLog<{
  implementationID: string;
  implementationAddress: string;
  0: string;
  1: string;
}>;
export type ManyToOne_ProxyDeployed = ContractEventLog<{
  implementationID: string;
  proxyAddress: string;
  0: string;
  1: string;
}>;
export type OneToOne_ImplementationLocked = ContractEventLog<{
  proxyAddress: string;
  0: string;
}>;
export type OneToOne_ImplementationUpdated = ContractEventLog<{
  proxyAddress: string;
  implementationAddress: string;
  0: string;
  1: string;
}>;
export type OneToOne_ProxyDeployed = ContractEventLog<{
  proxyAddress: string;
  implementationAddress: string;
  0: string;
  1: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;

export interface DelegateCallProxyManager extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): DelegateCallProxyManager;
  clone(): DelegateCallProxyManager;
  methods: {
    /**
     * Returns the address of the current owner.
     */
    owner(): NonPayableTransactionObject<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(): NonPayableTransactionObject<void>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    /**
     * Allows `deployer` to deploy many-to-one proxies.
     */
    approveDeployer(deployer: string): NonPayableTransactionObject<void>;

    /**
     * Prevents `deployer` from deploying many-to-one proxies.
     */
    revokeDeployerApproval(deployer: string): NonPayableTransactionObject<void>;

    /**
     * Creates a many-to-one proxy relationship. Deploys an implementation holder contract which stores the implementation address for many proxies. The implementation address can be updated on the holder to change the runtime code used by all its proxies.
     * @param implementation Address with the runtime code the proxies should use.
     * @param implementationID ID for the implementation, used to identify the proxies that use it. Also used as the salt in the create2 call when deploying the implementation holder contract.
     */
    createManyToOneProxyRelationship(
      implementationID: string | number[],
      implementation: string
    ): NonPayableTransactionObject<void>;

    /**
     * Lock the current implementation for `implementationID` so that it can never be upgraded again.
     */
    lockImplementationManyToOne(
      implementationID: string | number[]
    ): NonPayableTransactionObject<void>;

    /**
     * Lock the current implementation for `proxyAddress` so that it can never be upgraded again.
     */
    lockImplementationOneToOne(
      proxyAddress: string
    ): NonPayableTransactionObject<void>;

    /**
     * Updates the implementation address for a many-to-one proxy relationship.
     * @param implementation Address with the runtime code the proxies should use.
     * @param implementationID Identifier for the implementation.
     */
    setImplementationAddressManyToOne(
      implementationID: string | number[],
      implementation: string
    ): NonPayableTransactionObject<void>;

    /**
     * Updates the implementation address for a one-to-one proxy. Note: This could work for many-to-one as well if the caller provides the implementation holder address in place of the proxy address, as they use the same access control and update mechanism.
     * @param implementation Address with the runtime code for the proxy to use.
     * @param proxyAddress Address of the deployed proxy
     */
    setImplementationAddressOneToOne(
      proxyAddress: string,
      implementation: string
    ): NonPayableTransactionObject<void>;

    /**
     * Deploy a proxy contract with a one-to-one relationship with its implementation. The proxy will have its own implementation address which can be updated by the proxy manager.
     * @param implementation Address of the contract with the runtime code that the proxy should use.
     * @param suppliedSalt Salt provided by the account requesting deployment.
     */
    deployProxyOneToOne(
      suppliedSalt: string | number[],
      implementation: string
    ): NonPayableTransactionObject<string>;

    /**
     * Deploy a proxy with a many-to-one relationship with its implemenation. The proxy will call the implementation holder for every transaction to determine the address to use in calls.
     * @param implementationID Identifier for the proxy's implementation.
     * @param suppliedSalt Salt provided by the account requesting deployment.
     */
    deployProxyManyToOne(
      implementationID: string | number[],
      suppliedSalt: string | number[]
    ): NonPayableTransactionObject<string>;

    /**
     * Returns a boolean stating whether `implementationID` is locked.
     */
    "isImplementationLocked(bytes32)"(
      implementationID: string | number[]
    ): NonPayableTransactionObject<boolean>;

    /**
     * Returns a boolean stating whether `proxyAddress` is locked.
     */
    "isImplementationLocked(address)"(
      proxyAddress: string
    ): NonPayableTransactionObject<boolean>;

    /**
     * Returns a boolean stating whether `deployer` is allowed to deploy many-to-one proxies.
     */
    isApprovedDeployer(deployer: string): NonPayableTransactionObject<boolean>;

    /**
     * Queries the temporary storage value `_implementationHolder`. This is used in the constructor of the many-to-one proxy contract so that the create2 address is static (adding constructor arguments would change the codehash) and the implementation holder can be stored as a constant.
     */
    "getImplementationHolder()"(): NonPayableTransactionObject<string>;

    /**
     * Returns the address of the implementation holder contract for `implementationID`.
     */
    "getImplementationHolder(bytes32)"(
      implementationID: string | number[]
    ): NonPayableTransactionObject<string>;

    /**
     * Computes the create2 address for a one-to-one proxy requested by `originator` using `suppliedSalt`.
     * @param originator Address of the account requesting deployment.
     * @param suppliedSalt Salt provided by the account requesting deployment.
     */
    computeProxyAddressOneToOne(
      originator: string,
      suppliedSalt: string | number[]
    ): NonPayableTransactionObject<string>;

    /**
     * Computes the create2 address for a many-to-one proxy for the implementation `implementationID` requested by `originator` using `suppliedSalt`.
     * @param implementationID The identifier for the contract implementation.
     * @param originator Address of the account requesting deployment.
     * @param suppliedSalt Salt provided by the account requesting deployment.
     */
    computeProxyAddressManyToOne(
      originator: string,
      implementationID: string | number[],
      suppliedSalt: string | number[]
    ): NonPayableTransactionObject<string>;

    /**
     * Computes the create2 address of the implementation holder for `implementationID`.
     * @param implementationID The identifier for the contract implementation.
     */
    computeHolderAddressManyToOne(
      implementationID: string | number[]
    ): NonPayableTransactionObject<string>;
  };
  events: {
    DeploymentApprovalGranted(
      cb?: Callback<DeploymentApprovalGranted>
    ): EventEmitter;
    DeploymentApprovalGranted(
      options?: EventOptions,
      cb?: Callback<DeploymentApprovalGranted>
    ): EventEmitter;

    DeploymentApprovalRevoked(
      cb?: Callback<DeploymentApprovalRevoked>
    ): EventEmitter;
    DeploymentApprovalRevoked(
      options?: EventOptions,
      cb?: Callback<DeploymentApprovalRevoked>
    ): EventEmitter;

    ManyToOne_ImplementationCreated(
      cb?: Callback<ManyToOne_ImplementationCreated>
    ): EventEmitter;
    ManyToOne_ImplementationCreated(
      options?: EventOptions,
      cb?: Callback<ManyToOne_ImplementationCreated>
    ): EventEmitter;

    ManyToOne_ImplementationLocked(
      cb?: Callback<ManyToOne_ImplementationLocked>
    ): EventEmitter;
    ManyToOne_ImplementationLocked(
      options?: EventOptions,
      cb?: Callback<ManyToOne_ImplementationLocked>
    ): EventEmitter;

    ManyToOne_ImplementationUpdated(
      cb?: Callback<ManyToOne_ImplementationUpdated>
    ): EventEmitter;
    ManyToOne_ImplementationUpdated(
      options?: EventOptions,
      cb?: Callback<ManyToOne_ImplementationUpdated>
    ): EventEmitter;

    ManyToOne_ProxyDeployed(
      cb?: Callback<ManyToOne_ProxyDeployed>
    ): EventEmitter;
    ManyToOne_ProxyDeployed(
      options?: EventOptions,
      cb?: Callback<ManyToOne_ProxyDeployed>
    ): EventEmitter;

    OneToOne_ImplementationLocked(
      cb?: Callback<OneToOne_ImplementationLocked>
    ): EventEmitter;
    OneToOne_ImplementationLocked(
      options?: EventOptions,
      cb?: Callback<OneToOne_ImplementationLocked>
    ): EventEmitter;

    OneToOne_ImplementationUpdated(
      cb?: Callback<OneToOne_ImplementationUpdated>
    ): EventEmitter;
    OneToOne_ImplementationUpdated(
      options?: EventOptions,
      cb?: Callback<OneToOne_ImplementationUpdated>
    ): EventEmitter;

    OneToOne_ProxyDeployed(cb?: Callback<OneToOne_ProxyDeployed>): EventEmitter;
    OneToOne_ProxyDeployed(
      options?: EventOptions,
      cb?: Callback<OneToOne_ProxyDeployed>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(
    event: "DeploymentApprovalGranted",
    cb: Callback<DeploymentApprovalGranted>
  ): void;
  once(
    event: "DeploymentApprovalGranted",
    options: EventOptions,
    cb: Callback<DeploymentApprovalGranted>
  ): void;

  once(
    event: "DeploymentApprovalRevoked",
    cb: Callback<DeploymentApprovalRevoked>
  ): void;
  once(
    event: "DeploymentApprovalRevoked",
    options: EventOptions,
    cb: Callback<DeploymentApprovalRevoked>
  ): void;

  once(
    event: "ManyToOne_ImplementationCreated",
    cb: Callback<ManyToOne_ImplementationCreated>
  ): void;
  once(
    event: "ManyToOne_ImplementationCreated",
    options: EventOptions,
    cb: Callback<ManyToOne_ImplementationCreated>
  ): void;

  once(
    event: "ManyToOne_ImplementationLocked",
    cb: Callback<ManyToOne_ImplementationLocked>
  ): void;
  once(
    event: "ManyToOne_ImplementationLocked",
    options: EventOptions,
    cb: Callback<ManyToOne_ImplementationLocked>
  ): void;

  once(
    event: "ManyToOne_ImplementationUpdated",
    cb: Callback<ManyToOne_ImplementationUpdated>
  ): void;
  once(
    event: "ManyToOne_ImplementationUpdated",
    options: EventOptions,
    cb: Callback<ManyToOne_ImplementationUpdated>
  ): void;

  once(
    event: "ManyToOne_ProxyDeployed",
    cb: Callback<ManyToOne_ProxyDeployed>
  ): void;
  once(
    event: "ManyToOne_ProxyDeployed",
    options: EventOptions,
    cb: Callback<ManyToOne_ProxyDeployed>
  ): void;

  once(
    event: "OneToOne_ImplementationLocked",
    cb: Callback<OneToOne_ImplementationLocked>
  ): void;
  once(
    event: "OneToOne_ImplementationLocked",
    options: EventOptions,
    cb: Callback<OneToOne_ImplementationLocked>
  ): void;

  once(
    event: "OneToOne_ImplementationUpdated",
    cb: Callback<OneToOne_ImplementationUpdated>
  ): void;
  once(
    event: "OneToOne_ImplementationUpdated",
    options: EventOptions,
    cb: Callback<OneToOne_ImplementationUpdated>
  ): void;

  once(
    event: "OneToOne_ProxyDeployed",
    cb: Callback<OneToOne_ProxyDeployed>
  ): void;
  once(
    event: "OneToOne_ProxyDeployed",
    options: EventOptions,
    cb: Callback<OneToOne_ProxyDeployed>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;
}
