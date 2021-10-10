<template>
  <div class="wrapper">
    <div class="header">
      <div class="nav">
        <ul>
          <li class="logo">
            <img src="/logo.svg" />
          </li>
          <li class="menu-item">
            <a href="https://pamchain.com">Home</a>
          </li>
          <li class="menu-item">
            <a href="https://docs.pamchain.com">Documents</a>
          </li>
          <li class="menu-item">
            <p v-if="$eth.isConnected">
              Connected to {{ walletAddress }} on chain {{ $eth.networkName }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="banners">
      <div class="banner-item">
        <div class="banner-text">
          <h1>Crosschain Automation Data Oracle</h1>
          <h2>
            PAM Chain is an automated realtime data oracle that send alert on
            monitored assets intend to use by trading bots and Dapps.
          </h2>
          <a class="trynow" @click="loadChainIndices()">0. Load indices</a>
          <a class="trynow" @click="connectMetamask()">1. Connect Metamask</a>
          <a class="trynow" @click="getBalance()">2. Get Balance (DAI)</a>
          <a class="trynow" @click="getPoolPrice()">3. Get Pool Price</a>
          <a class="trynow" @click="getPoolTokens()">4. Get Pool Tokens</a>
          <a class="trynow" @click="getSpotPrice()"
            >5. Get Spot Price (DAI=>USDT)</a
          >
          <a class="trynow" @click="approveToken()">6. Approve Token (DAI)</a>
          <a class="trynow" @click="swapToken()">7. Swap Token (DAI=>USDT)</a>
          <a class="trynow" @click="getTotalSupply()"
            >8. Get Total Supply (DEVIL3)</a
          >
          <a class="trynow" @click="getTradeTransaction()"
            >8. Get Trade Transaction</a
          >
          <div class="console">
            <Field v-model="form" :options="formFields" />
          </div>
        </div>
        <div class="banner-image">
          <img src="/main-banner.png" />
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="logo">
        <img src="/logo-3ds-white.png" />
      </div>
      <div class="email">Email: contact@3dsinteractive.com</div>
      <div class="address">
        3DS Interactive Co.,Ltd. 248 Krungthonburi road, Klongtonsai, Klongsan,
        Bangkok Thailand 10600
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AbiItem } from 'web3-utils'
import { Component, Provide } from 'vue-property-decorator'
// import Web3 from 'web3'
import Erc20Contract from '../build/contracts/ERC20Token.json'
import IndexPoolContract from '../build/contracts/IndexPool.json'
import { ERC20Token } from '../types/web3-v1-contracts/ERC20Token'
import { IndexPool } from '../types/web3-v1-contracts/IndexPool'
import { ERC20TokenModel } from '../models/types'
import { BaseForm } from '~/core/BaseForm'
import { PageLoader } from '~/loader/page'
import { Core } from '~/core/Core'
import { API_TYPE } from '~/constants/apiTypes'
import { IFormOption, INPUT_TYPES } from '~/components/form/FormTypes'
import { ContractLoader } from '~/loader/contract'
import { WalletLoader } from '~/loader/wallet'
import {
  ERC20TokenAddress,
  PoolsAddress,
  getERC20TokenModelByAddress
} from '~/constants/chainAddress'

@Component
export default class Play extends BaseForm<any> {
  // eslint-disable-next-line camelcase
  @Provide('form_name') form_name = 'play_form'

  poolTokens: ERC20TokenModel[] = []

  get poolTokensPrintable(): string {
    return JSON.stringify(this.poolTokens, null, 2)
  }

  getERC20Contract(addr: string): ERC20Token {
    return new this.$web3.eth.Contract(Erc20Contract.abi as AbiItem[], addr, {
      from: this.walletAddress
    }) as any as ERC20Token
  }

  getPoolContract(addr: string): IndexPool {
    return new this.$web3.eth.Contract(
      IndexPoolContract.abi as AbiItem[],
      addr,
      { from: this.walletAddress }
    ) as any as IndexPool
  }

  mounted() {
    this.chainIndicesLoader.initial()
    this.tradeTransactionLoader.initial()
    this.walletLoader.initial()
    this.balanceLoader.initial()
    this.swapActor.initial()
    this.poolTokensLoader.initial()
    // When fetch wallet on mounted event, we will not popup metamask by setting reconnect=true
    this.walletLoader.$fetch({ reconnect: true })
  }

  get walletLoader(): WalletLoader {
    return new WalletLoader(this, (data: any) => ({
      onFetchSuccess: (newValue: any) => {
        this.balanceLoader.$fetch()
        this.formRepo.updateAttr(this.form_name, 'terminal', this.walletAddress)
      }
    }))
  }

  get walletAddress() {
    const addrs = this.walletLoader.fetchItems
    if (addrs && addrs.length > 0) {
      return addrs[0]
    }
    return null
  }

  get chainIndicesLoader(): PageLoader {
    return new PageLoader(this, (data: any) => ({
      apiType: API_TYPE.PAMCHAIN,
      baseURL: Core.PAMChainAPI('/api/chain-indices'),
      params: {},
      onFetchSuccess: (newValue: any) => {
        this.formRepo.updateAttr(
          this.form_name,
          'terminal',
          this.chainIndicesPrintable
        )
      }
    }))
  }

  get tradeTransactionLoader(): PageLoader {
    return new PageLoader(this, (data: any) => ({
      apiType: API_TYPE.PAMCHAIN,
      baseURL: Core.PAMChainAPI('/api/trades'),
      params: {},
      onFetchSuccess: (newValue: any) => {
        this.formRepo.updateAttr(
          this.form_name,
          'terminal',
          this.tradeTransactionPrintable
        )
      }
    }))
  }

  get chainIndicesPrintable(): string {
    return JSON.stringify(this.chainIndicesLoader.fetchItems, null, 2)
  }

  get tradeTransactionPrintable(): string {
    return JSON.stringify(this.tradeTransactionLoader.fetchItems, null, 2)
  }

  get balanceLoader(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = this.getERC20Contract(ERC20TokenAddress.DAI)

        try {
          const balance = await contract.methods
            .balanceOf(this.walletAddress)
            .call()
          this.formRepo.updateAttr(this.form_name, 'terminal', balance)
          return balance
        } catch (err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `err = ${errmsg}`
          )
        }
      }
    }))
  }

  get totalSupplyLoader(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = this.getERC20Contract(PoolsAddress.DEVIL3)

        try {
          const totalSupply = await contract.methods.totalSupply().call()
          this.formRepo.updateAttr(this.form_name, 'terminal', totalSupply)
          console.log(totalSupply)
          return totalSupply
        } catch (err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `err = ${errmsg}`
          )
        }
      }
    }))
  }

  get approveActor(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = this.getERC20Contract(ERC20TokenAddress.DAI)

        try {
          const value = web3.utils.toWei(`${Number.MAX_SAFE_INTEGER}`)
          const res = await contract.methods
            .approve(PoolsAddress.DEVIL3, value)
            .send()
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `res = ${res.transactionHash}`
          )
        } catch (err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `err = ${errmsg}`
          )
        }
      }
    }))
  }

  get poolTokensLoader(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = this.getPoolContract(PoolsAddress.DEVIL3)

        try {
          const tokenAddrs = await contract.methods.getCurrentTokens().call()
          this.poolTokens = []
          console.log(tokenAddrs)

          for (const i in tokenAddrs) {
            const tokenAddr = tokenAddrs[i]
            const tokenRecord: any = await contract.methods
              .getTokenRecord(tokenAddr)
              .call()
            // Sample tokenRecord
            // {
            //   balance: "500000000000000000000"
            //   bound: true
            //   denorm: "2600000000000000000" // x / 26 * 100
            //   desiredDenorm: "2600000000000000000"
            //   index: "6"
            //   lastDenormUpdate: "1633461596"
            //   length: 7
            //   ready: true
            // }
            const erc20 = getERC20TokenModelByAddress(tokenAddr)

            //  erc20.price = web3.utils.fromWei(tokenRecord.balance)
            // erc20.weight = web3.utils.fromWei(tokenRecord.denorm)

            this.poolTokens.push(erc20)
          }
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `res = ${this.poolTokensPrintable}`
          )
        } catch (err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `err = ${errmsg}`
          )
        }
      }
    }))
  }

  get swapActor(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = this.getPoolContract(PoolsAddress.DEVIL3)

        const tokenIn = ERC20TokenAddress.DAI
        const tokenAmountIn = web3.utils.toWei('4')
        const tokenOut = ERC20TokenAddress.USDT
        const tokenAmountOut = web3.utils.toWei('3')
        const maxPrice = web3.utils.toWei('2')

        try {
          const res = await contract.methods
            .swapExactAmountIn(
              tokenIn,
              tokenAmountIn,
              tokenOut,
              tokenAmountOut,
              maxPrice
            )
            .send()
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `res = ${res.transactionHash}`
          )
        } catch (err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(
            this.form_name,
            'terminal',
            `err = ${errmsg}`
          )
        }
      }
    }))
  }

  loadChainIndices() {
    this.chainIndicesLoader.$fetch()
  }

  loadTradeTransaction() {
    this.tradeTransactionLoader.$fetch()
  }

  connectMetamask() {
    this.walletLoader.$fetch()
  }

  getBalance() {
    this.balanceLoader.$fetch()
  }

  getTotalSupply() {
    this.totalSupplyLoader.$fetch()
  }

  getTradeTransaction() {
    this.tradeTransactionLoader.$fetch()
  }

  getPoolPrice() {}

  getPoolTokens() {
    this.poolTokensLoader.$fetch()
  }

  getSpotPrice() {}

  approveToken() {
    this.approveActor.$fetch()
  }

  swapToken() {
    this.swapActor.$fetch()
  }

  get formFields(): IFormOption[] {
    return [
      {
        type: INPUT_TYPES.TEXTAREA,
        col: '12',
        props: {
          name: 'terminal',
          label: '',
          placeholder: '',
          defaultValue: '',
          rowsAmount: 20,
          color: '#000000'
        }
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-flow: row wrap;
  background-color: #000000;
  justify-content: center;

  .header {
    flex: 1 100%;

    .nav {
      ul.menuOpen {
        li.menu-item {
          display: block;
        }
      }

      ul {
        display: flex;
        flex-flow: row wrap;
        margin-top: 10px;

        li {
          flex: 1 100%;
          display: block;
          text-align: center;
          list-style: none;
          padding: 10px 0px;

          a,
          p {
            color: #ffffff;
            text-decoration: none;
          }
        }

        li.logo {
          order: 1;
          flex: 1 90%;
          padding-left: 50px;
        }

        li.menu-button {
          order: 2;
          flex: 0 10%;
          cursor: pointer;
        }

        li.menu-item {
          order: 3;
          display: none;
        }
      }
    }
  }

  @media (min-width: 800px) {
    .header {
      max-width: 1200px;

      .nav {
        ul {
          justify-content: space-between;

          li {
            flex: 0 auto;
          }

          li.logo {
            text-align: left;
            flex: 1 auto;
            padding-left: 20px;
          }

          li.menu-button {
            display: none;
          }

          li.menu-item {
            display: block;
            margin-right: 20px;
          }
        }
      }
    }
  }

  .banners {
    .banner-item {
      .banner-text {
        padding: 20px;
        text-align: left;

        h1 {
          color: #ffffff;
          font-size: 44px;
        }

        h2 {
          color: #ffffff;
        }

        a.trynow {
          display: block;
          width: 250px;
          height: 30px;
          border-radius: 3px;
          background: rgb(2, 0, 36);
          background: linear-gradient(
            0deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(253, 146, 25, 1) 0%,
            rgba(249, 180, 75, 1) 100%
          );
          color: #4b3611;
          text-decoration: none;
          font-size: 16px;
          padding-top: 5px;
          padding-left: 10px;
          margin: auto;
          margin-top: 20px;
          cursor: pointer;
        }

        .console {
          margin-top: 30px;
          height: 600px;
          padding: 0px 10px;
        }
      }
      .banner-image {
        img {
          width: 100%;
        }
      }
    }
  }

  @media (min-width: 800px) {
    .banners {
      max-width: 1200px;

      .banner-item {
        display: flex;
        flex-flow: row nowrap;

        .banner-text {
          flex: 1 50%;
          margin-top: 100px;

          h1 {
            text-align: left;
          }
          h2 {
            text-align: left;
          }
          a.trynow {
            margin-left: 0px;
          }
        }
        .banner-image {
          flex: 1 50%;
          img {
            width: 100%;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 50px;
    text-align: center;
    padding: 50px;

    img {
      width: 100px;
    }
    .email {
      color: #ffffff;
      margin-top: 20px;
    }
    .address {
      color: #ffffff;
    }
  }

  @media (min-width: 800px) {
    .footer {
      max-width: 1200px;
      display: flex;
      text-align: left;
      justify-content: space-between;

      .logo {
        flex: 0 auto;
        img {
          width: 150px;
        }
      }

      .email {
        color: #ffffff;
        margin-top: 0px;
        flex: 0 30%;
      }

      .address {
        color: #ffffff;
        flex: 0 30%;
      }
    }
  }
}
</style>
