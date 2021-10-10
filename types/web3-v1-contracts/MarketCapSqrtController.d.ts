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

export type CategoryAdded = ContractEventLog<{
  categoryID: string;
  metadataHash: string;
  0: string;
  1: string;
}>;
export type CategorySorted = ContractEventLog<{
  categoryID: string;
  0: string;
}>;
export type NewPoolInitializer = ContractEventLog<{
  pool: string;
  initializer: string;
  categoryID: string;
  indexSize: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type PoolInitialized = ContractEventLog<{
  pool: string;
  unboundTokenSeller: string;
  categoryID: string;
  indexSize: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type TokenAdded = ContractEventLog<{
  token: string;
  categoryID: string;
  0: string;
  1: string;
}>;
export type TokenRemoved = ContractEventLog<{
  token: string;
  categoryID: string;
  0: string;
  1: string;
}>;

export interface MarketCapSqrtController extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MarketCapSqrtController;
  clone(): MarketCapSqrtController;
  methods: {
    /**
     * Adds a new token to a category.
     * @param categoryID Category identifier.
     * @param token Token to add to the category.
     */
    addToken(
      categoryID: number | string | BN,
      token: string
    ): NonPayableTransactionObject<void>;

    /**
     * Add tokens to a category.
     * @param categoryID Category identifier.
     * @param tokens Array of tokens to add to the category.
     */
    addTokens(
      categoryID: number | string | BN,
      tokens: string[]
    ): NonPayableTransactionObject<void>;

    categoryIndex(): NonPayableTransactionObject<string>;

    /**
     * Compute the average market cap of a token in weth. Queries the average amount of ether that the total supply is worth using the recent moving average price.
     */
    computeAverageMarketCap(token: string): NonPayableTransactionObject<string>;

    /**
     * Returns the average market cap for each token.
     */
    computeAverageMarketCaps(
      tokens: string[]
    ): NonPayableTransactionObject<string[]>;

    /**
     * Creates a new token category.
     * @param metadataHash Hash of metadata about the token category which can be distributed on IPFS.
     */
    createCategory(
      metadataHash: string | number[]
    ): NonPayableTransactionObject<void>;

    defaultSellerPremium(): NonPayableTransactionObject<string>;

    /**
     * Returns the fully diluted market caps for the tokens in a category.
     */
    getCategoryMarketCaps(
      categoryID: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    /**
     * Returns the array of tokens in a category.
     */
    getCategoryTokens(
      categoryID: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    /**
     * Returns the timestamp of the last time the category was sorted.
     */
    getLastCategoryUpdate(
      categoryID: number | string | BN
    ): NonPayableTransactionObject<string>;

    /**
     * Get the top `num` tokens in a category. Note: The category must have been sorted by market cap in the last `MAX_SORT_DELAY` seconds.
     */
    getTopCategoryTokens(
      categoryID: number | string | BN,
      num: number | string | BN
    ): NonPayableTransactionObject<string[]>;

    /**
     * Returns a boolean stating whether a category exists.
     */
    hasCategory(
      categoryID: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    /**
     * Returns boolean stating whether `token` is a member of the category `categoryID`.
     */
    isTokenInCategory(
      categoryID: number | string | BN,
      token: string
    ): NonPayableTransactionObject<boolean>;

    oracle(): NonPayableTransactionObject<string>;

    /**
     * Sorts a category's tokens in descending order by market cap. Note: Uses in-memory insertion sort.
     * @param categoryID Category to sort
     */
    orderCategoryTokensByMarketCap(
      categoryID: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Returns the address of the current owner.
     */
    owner(): NonPayableTransactionObject<string>;

    /**
     * Remove token from a category.
     * @param categoryID Category identifier.
     * @param token Token to remove from the category.
     */
    removeToken(
      categoryID: number | string | BN,
      token: string
    ): NonPayableTransactionObject<void>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(): NonPayableTransactionObject<void>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    /**
     * Updates the prices on the oracle for all the tokens in a category.
     */
    updateCategoryPrices(
      categoryID: number | string | BN
    ): NonPayableTransactionObject<boolean[]>;

    /**
     * Initialize the controller with the owner address and default seller premium. This sets up the controller which is deployed as a singleton proxy.
     */
    initialize(): NonPayableTransactionObject<void>;

    /**
     * Deploys an index pool and a pool initializer. The initializer contract is a pool with specific token balance targets which gives pool tokens in the finished pool to users who provide the underlying tokens needed to initialize it.
     */
    prepareIndexPool(
      categoryID: number | string | BN,
      indexSize: number | string | BN,
      initialWethValue: number | string | BN,
      name: string,
      symbol: string
    ): NonPayableTransactionObject<{
      poolAddress: string;
      initializerAddress: string;
      0: string;
      1: string;
    }>;

    /**
     * Initializes a pool which has been deployed but not initialized and transfers the underlying tokens from the initialization pool to the actual pool.
     */
    finishPreparedIndexPool(
      poolAddress: string,
      tokens: string[],
      balances: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    /**
     * Sets the default premium rate for token seller contracts.
     */
    setDefaultSellerPremium(
      _defaultSellerPremium: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Set the premium rate on `sellerAddress` to the given rate.
     */
    updateSellerPremium(
      tokenSeller: string,
      premiumPercent: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Sets the maximum number of pool tokens that can be minted for a particular pool. This value will be used in the alpha to limit the maximum damage that can be caused by a catastrophic error. It can be gradually increased as the pool continues to not be exploited. If it is set to 0, the limit will be removed.
     * @param maxPoolTokens Maximum LP tokens the pool can mint.
     * @param poolAddress Address of the pool to set the limit on.
     */
    setMaxPoolTokens(
      poolAddress: string,
      maxPoolTokens: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Sets the swap fee on an index pool.
     */
    setSwapFee(
      poolAddress: string,
      swapFee: number | string | BN
    ): NonPayableTransactionObject<void>;

    /**
     * Updates the minimum balance of an uninitialized token, which is useful when the token's price on the pool is too low relative to external prices for people to trade it in.
     */
    updateMinimumBalance(
      pool: string,
      tokenAddress: string
    ): NonPayableTransactionObject<void>;

    /**
     * Delegates a comp-like governance token from an index pool to a provided address.
     */
    delegateCompLikeTokenFromPool(
      pool: string,
      token: string,
      delegatee: string
    ): NonPayableTransactionObject<void>;

    /**
     * Re-indexes a pool by setting the underlying assets to the top tokens in its category by market cap.
     */
    reindexPool(poolAddress: string): NonPayableTransactionObject<void>;

    /**
     * Reweighs the assets in a pool by market cap and sets the desired new weights, which will be adjusted over time.
     */
    reweighPool(poolAddress: string): NonPayableTransactionObject<void>;

    /**
     * Compute the create2 address for a pool initializer.
     */
    computeInitializerAddress(
      poolAddress: string
    ): NonPayableTransactionObject<string>;

    /**
     * Compute the create2 address for a pool's unbound token seller.
     */
    computeSellerAddress(
      poolAddress: string
    ): NonPayableTransactionObject<string>;

    /**
     * Compute the create2 address for a pool.
     */
    computePoolAddress(
      categoryID: number | string | BN,
      indexSize: number | string | BN
    ): NonPayableTransactionObject<string>;

    /**
     * Queries the top `indexSize` tokens in a category from the market oracle, computes their relative weights by market cap square root and determines the weighted balance of each token to meet a specified total value.
     */
    getInitialTokensAndBalances(
      categoryID: number | string | BN,
      indexSize: number | string | BN,
      wethValue: number | string | BN
    ): NonPayableTransactionObject<{
      tokens: string[];
      balances: string[];
      0: string[];
      1: string[];
    }>;
  };
  events: {
    CategoryAdded(cb?: Callback<CategoryAdded>): EventEmitter;
    CategoryAdded(
      options?: EventOptions,
      cb?: Callback<CategoryAdded>
    ): EventEmitter;

    CategorySorted(cb?: Callback<CategorySorted>): EventEmitter;
    CategorySorted(
      options?: EventOptions,
      cb?: Callback<CategorySorted>
    ): EventEmitter;

    NewPoolInitializer(cb?: Callback<NewPoolInitializer>): EventEmitter;
    NewPoolInitializer(
      options?: EventOptions,
      cb?: Callback<NewPoolInitializer>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    PoolInitialized(cb?: Callback<PoolInitialized>): EventEmitter;
    PoolInitialized(
      options?: EventOptions,
      cb?: Callback<PoolInitialized>
    ): EventEmitter;

    TokenAdded(cb?: Callback<TokenAdded>): EventEmitter;
    TokenAdded(options?: EventOptions, cb?: Callback<TokenAdded>): EventEmitter;

    TokenRemoved(cb?: Callback<TokenRemoved>): EventEmitter;
    TokenRemoved(
      options?: EventOptions,
      cb?: Callback<TokenRemoved>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "CategoryAdded", cb: Callback<CategoryAdded>): void;
  once(
    event: "CategoryAdded",
    options: EventOptions,
    cb: Callback<CategoryAdded>
  ): void;

  once(event: "CategorySorted", cb: Callback<CategorySorted>): void;
  once(
    event: "CategorySorted",
    options: EventOptions,
    cb: Callback<CategorySorted>
  ): void;

  once(event: "NewPoolInitializer", cb: Callback<NewPoolInitializer>): void;
  once(
    event: "NewPoolInitializer",
    options: EventOptions,
    cb: Callback<NewPoolInitializer>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "PoolInitialized", cb: Callback<PoolInitialized>): void;
  once(
    event: "PoolInitialized",
    options: EventOptions,
    cb: Callback<PoolInitialized>
  ): void;

  once(event: "TokenAdded", cb: Callback<TokenAdded>): void;
  once(
    event: "TokenAdded",
    options: EventOptions,
    cb: Callback<TokenAdded>
  ): void;

  once(event: "TokenRemoved", cb: Callback<TokenRemoved>): void;
  once(
    event: "TokenRemoved",
    options: EventOptions,
    cb: Callback<TokenRemoved>
  ): void;
}