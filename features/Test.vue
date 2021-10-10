<template>
  <div class="wrapper pt-5">
    <v-row>
      <v-col>
        <IndexBuy />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <IndexActionMint />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {BaseForm} from '~/core/BaseForm'
import {Component, Provide} from 'vue-property-decorator'
import {PageLoader} from '~/loader/page'
import {Core} from '~/core/Core'
import {API_TYPE} from "~/constants/apiTypes";
import {IFormOption, INPUT_TYPES} from '~/components/form/FormTypes'
import IndexBuy from '~/features/indexes/IndexBuy.vue';
import IndexActionMint from '~/features/indexes/IndexActionMint.vue';

import Web3 from 'web3'
import {AbiItem} from 'web3-utils'
import {ContractLoader} from '~/loader/contract'
import {WalletLoader} from '~/loader/wallet'
import Erc20Contract from '../build/contracts/ERC20Token.json'
import IndexPoolContract from '../build/contracts/IndexPool.json'
import {ERC20Token} from '../types/web3-v1-contracts/ERC20Token'
import {IndexPool} from '../types/web3-v1-contracts/IndexPool'

@Component({
  components: {IndexBuy,IndexActionMint}
})
export default class Play extends BaseForm<any> {

  @Provide('form_name') form_name = 'play_form'

  get walletAddress() {
    const addrs = this.walletLoader.fetchItems
    if (addrs && addrs.length > 0) {
      return addrs[0]
    }
    return null
  }

  async mounted() {
    this.chainIndicesLoader.initial()
    this.chainIndicesLoader.$fetch()

    this.walletLoader.initial()
    this.balanceLoader.initial()
    this.transferActor.initial()

    // When fetch wallet on mounted event, we will not popup metamask by setting reconnect=true
    this.walletLoader.$fetch({reconnect:true})
  }

  get walletLoader() : WalletLoader {
    return new WalletLoader(this, (data: any) => ({
      onFetchSuccess: (newValue: any) => {
        this.formRepo.updateAttr(this.form_name, 'terminal', this.walletAddress)
      }
    }))
  }

  get chainIndicesLoader(): PageLoader {
    return new PageLoader(this, (data: any) => ({
      apiType: API_TYPE.PAMCHAIN,
      baseURL: Core.PAMChainAPI('/api/chain-indices'),
      params: {},
      onFetchSuccess: (newValue: any) => {
        // this.formRepo.updateAttr(this.form_name, 'terminal', this.chainIndices)
      }
    }))
  }

  get chainIndices(): string {
    return JSON.stringify(this.chainIndicesLoader.fetchItems, null, 2)
  }

  get balanceLoader(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = (new web3.eth.Contract(Erc20Contract.abi as AbiItem[], 
          '0xc0DD9dD1C257c307772F56a113B8596b5d9fA8F4') as any) as ERC20Token

        try {
          const balance = await contract.methods.balanceOf(this.walletAddress).call()
          this.formRepo.updateAttr(this.form_name, 'terminal', balance)
          return balance
        } catch(err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(this.form_name, 'terminal', `err = ${errmsg}`)
        }
      }
    }))
  }

  get approveActor(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = (new web3.eth.Contract(
          Erc20Contract.abi as AbiItem[], 
          '0xc0DD9dD1C257c307772F56a113B8596b5d9fA8F4',
          {from:this.walletAddress}) as any) as ERC20Token

        try {
          const value = web3.utils.toWei(`${Number.MAX_SAFE_INTEGER}`)
          const res = await contract.methods.approve('0x6ee86436ff740be0cca40017194e1ebb5481affa', value).send()
          this.formRepo.updateAttr(this.form_name, 'terminal', `res = ${res.transactionHash}`)
        } catch(err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(this.form_name, 'terminal', `err = ${errmsg}`)
        }
      }
    }))
  }

  get transferActor(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = (new web3.eth.Contract(
          IndexPoolContract.abi as AbiItem[], 
          '0x6ee86436ff740be0cca40017194e1ebb5481affa',
          {from:this.walletAddress}) as any) as IndexPool

        const tokenIn = '0xc0DD9dD1C257c307772F56a113B8596b5d9fA8F4'
        const tokenAmountIn = web3.utils.toWei('4')
        const tokenOut = '0xf798aB74b66abb549A66d2fBdBC64249a5EB8479'
        const tokenAmountOut = web3.utils.toWei('3')
        const maxPrice = web3.utils.toWei('2')

        try {
          const res = await contract.methods.swapExactAmountIn(tokenIn, tokenAmountIn, tokenOut, tokenAmountOut, maxPrice).send()
          this.formRepo.updateAttr(this.form_name, 'terminal', `res = ${res.transactionHash}`)
        } catch(err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          this.formRepo.updateAttr(this.form_name, 'terminal', `err = ${errmsg}`)
        }
      }
    }))
  }

  get balance(): string {
    return JSON.stringify(this.balanceLoader.fetchItems, null, 2)
  }

  connectMetamask() {
    this.walletLoader.$fetch()
  }

  approveToken() {
    this.approveActor.$fetch()
  }

  swapToken() {
    this.transferActor.$fetch()
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
          color: "#000000"
        }
      }
    ]
  }
}

</script>

<style lang="scss" scoped>

  .wrapper {
    display: flex;
    flex-flow: column wrap;
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

            a, p {
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

    @media (min-width: 800px){
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
            width: 200px;
            height: 30px;
            border-radius: 3px;
            background: rgb(2,0,36);
            background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(253,146,25,1) 0%, rgba(249,180,75,1) 100%);
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
            background: #ffffff;
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

    @media (min-width: 800px){
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

    @media (min-width: 800px){
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
