<template>
  <div>
    <BackNav :title="`${poolModel.name} INDEX`" link="/indexes" />
    <section id="index-detail" class="bg-dark theme-background">
      <div class="page-container pb-8">
        <!-- Header Section -->
        <div class="d-block d-md-flex justify-space-between pa-4 pa-md-0">
          <div class="mb-4">
            <v-btn
              height="48"
              :class="
                selectAction == 'mint' ? 'primary black--text' : 'background'
              "
              @click="selectAction = 'mint'"
            >
              <v-icon left>mdi-circle-multiple-outline</v-icon>Mint
            </v-btn>
            <v-btn
              height="48"
              :class="
                selectAction == 'burn' ? 'primary black--text' : 'background'
              "
              @click="selectAction = 'burn'"
            >
              <v-icon left>mdi-fire</v-icon>Burn
            </v-btn>
          </div>
          <div class="d-flex mb-4">
            <div class="mr-4">
              <h5 class="accent--text">Volume</h5>
              <h3 class="white--text">$185,068.01</h3>
            </div>
            <div>
              <h5 class="accent--text">Total value locked</h5>
              <h3 class="primary--text">
                {{ numberWithCommas(totalValueLocked) }}
              </h3>
            </div>
          </div>
        </div>
        <!-- Action Section -->
        <v-row v-show="isOnAction" class="py-4">
          <v-col cols="12" md="6">
            <h3 class="text-uppercase mb-4 action-title">
              <img :src="poolModel.icon" width="20" /> {{ selectAction }}
              {{ poolModel.name }}
            </h3>
            <IndexActionMint
              v-show="selectAction === 'mint'"
              :action="selectAction"
              :pool_tokens="poolTokens"
              :index="poolModel.name"
              :icon="poolModel.icon"
              :wallet-balance="walletBalance"
              :wallet-coin-name="walletCoinName"
              :mint-rate="mintRate"
              @change-coin-in="onMintCoinChanged"
              @click-mint="onClickMint"
            />
            <IndexActionBurn
              v-show="selectAction === 'burn'"
              :action="selectAction"
              :pool_tokens="poolTokens"
              :index="poolModel.name"
              :icon="poolModel.icon"
            />
          </v-col>
        </v-row>
        <!-- Detail Section -->
        <v-row>
          <v-col cols="12" md="6">
            <IndexDetail />
          </v-col>
          <v-col cols="12" md="6">
            <IndexGraph :icon="poolModel.icon" />
          </v-col>
        </v-row>
      </div>
    </section>
    <section id="index-assets" class="bg-light">
      <div class="page-container py-8">
        <v-row>
          <v-col cols="12" md="6">
            <IndexAssetList :tokens="poolTokens" @submit="onSubmit" />
          </v-col>
          <v-col cols="12" md="6">
            <IndexRecentTrade />
          </v-col>
        </v-row>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { AbiItem } from 'web3-utils'
import { Component, Watch, Prop } from 'vue-property-decorator'
import { ERC20Token } from '~/types/web3-v1-contracts/ERC20Token'
import Erc20Contract from '~/build/contracts/ERC20Token.json'
import { IndexPool } from '~/types/web3-v1-contracts/IndexPool'
import { BaseApp } from '~/core/Base'
import IndexDetail from '~/features/indexes/IndexDetail.vue'
import IndexGraph from '~/features/indexes/IndexGraph.vue'
import IndexAssetList from '~/features/indexes/IndexAssetList.vue'
import IndexRecentTrade from '~/features/indexes/IndexRecentTrades.vue'
import IndexActionMint from '~/features/indexes/IndexActionMint.vue'
import IndexActionBurn from '~/features/indexes/IndexActionBurn.vue'
import { ContractLoader } from '~/loader/contract'
import { ERC20TokenModel, PoolModel } from '~/models/types'
import IndexPoolContract from '~/build/contracts/IndexPool.json'
import { WalletLoader } from '~/loader/wallet'
import {
  // ERC20TokenAddress,
  PoolsAddress,
  getERC20TokenModelByAddress,
  getPoolModelByName,
  getERC20AddressByName
} from '~/constants/chainAddress'

@Component({
  components: {
    IndexDetail,
    IndexGraph,
    IndexAssetList,
    IndexRecentTrade,
    IndexActionMint,
    IndexActionBurn
  }
})
export default class IndexView extends BaseApp {
  // eslint-disable-next-line camelcase
  @Prop(String) readonly pool_name!: string

  isOnAction = false
  selectAction = ''
  totalValueLocked = 0
  poolModel: PoolModel = {}
  poolTokens: ERC20TokenModel[] = []

  walletBalance = '0'
  walletCoinName = 'ETH'
  mintRate = 1

  getERC20Contract(addr: string): ERC20Token {
    return new this.$web3.eth.Contract(Erc20Contract.abi as AbiItem[], addr, {
      from: this.walletAddress
    }) as any as ERC20Token
  }

  async onMintCoinChanged(coinName: string) {
    await this.calculateJoinRate(coinName)
    this.walletCoinName = coinName
    this.walletBalance = '...'
    const web3 = this.$web3
    const balanceLoader = new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const coinAddress = getERC20AddressByName(coinName)
        const contract = this.getERC20Contract(coinAddress)

        try {
          const balance = await contract.methods
            .balanceOf(this.walletAddress)
            .call()
          this.walletBalance = web3.utils.fromWei(balance)
        } catch (err: any) {
          alert(err)
          this.walletCoinName = '...'
        }
      }
    }))
    balanceLoader.initial()
    balanceLoader.$fetch()
  }

  calculateJoinRate(tokenName: string) {
    this.mintRate = 0.017
    // if (this.poolTokens.length === 0) {
    //   this.mintRate = 0
    // }
    // let totalWeight = 0
    // let tokenWeight = 0
    // for (const i in this.poolTokens) {
    //   const token = this.poolTokens[i]
    //   totalWeight += Number(this.$web3.utils.fromWei(token.denorm ?? '0'))
    //   if (token.name === tokenName) {
    //     tokenWeight = Number(this.$web3.utils.fromWei(token.denorm ?? '0'))
    //   }
    // }
    // this.mintRate = tokenWeight / totalWeight
  }

  async approveToken(token: string) {
    try {
      const contract = this.getERC20Contract(token)
      const value = this.$web3.utils.toWei(`${Number.MAX_SAFE_INTEGER}`)
      await contract.methods.approve(this.poolModel.address ?? '', value).send()
    } catch (err: any) {
      //const errmsg = this.$web3Helper.errorMessage(err)
      alert(err)
    }
  }

  async onClickMint(data: any) {
    const tokenIn = data.token
    const amountIn = this.$web3.utils.toWei(`${data.in}`)
    //const amountOut = this.$web3.utils.toWei(`${data.out}`)
    const amountOut = this.$web3.utils.toWei('0.1')

    const tokenInAddress = getERC20AddressByName(tokenIn) ?? ''
    const tokenOut = this.poolModel.address ?? ''

    await this.approveToken(tokenInAddress)

    const contract = this.getPoolContract(tokenOut)
    await contract.methods
      .joinswapExternAmountIn(tokenInAddress, amountIn, amountOut)
      .send()
  }

  get walletLoader(): WalletLoader {
    return new WalletLoader(this, () => ({
      onFetchSuccess: () => {
        // this.balanceLoader.$fetch()
        // this.formRepo.updateAttr(this.form_name, 'terminal', this.walletAddress)
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

  getPoolContract(addr: string): IndexPool {
    return new this.$web3.eth.Contract(
      IndexPoolContract.abi as AbiItem[],
      addr,
      {
        from: this.walletAddress
      }
    ) as any as IndexPool
  }

  get poolTokensLoader(): ContractLoader {
    return new ContractLoader(this, () => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = this.getPoolContract(PoolsAddress.DEVIL3)

        try {
          const tokenAddrs = await contract.methods.getCurrentTokens().call()
          const tokens = []

          for (const i in tokenAddrs) {
            const tokenAddr = tokenAddrs[i]
            const tokenRecord: any = await contract.methods
              .getTokenRecord(tokenAddr)
              .call()

            const erc20 = getERC20TokenModelByAddress(tokenAddr)
            erc20.balance = tokenRecord.balance
            erc20.bound = tokenRecord.bond
            erc20.denorm = tokenRecord.denorm
            erc20.desiredDenorm = tokenRecord.desiredDenorm
            erc20.index = tokenRecord.index
            erc20.lastDenormUpdate = tokenRecord.lastDenormUpdate
            erc20.length = tokenRecord.length
            erc20.ready = tokenRecord.ready
            erc20.weight = web3.utils.fromWei(tokenRecord.denorm)
            tokens.push(erc20)
          }
          this.poolTokens = tokens
        } catch (err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          alert(errmsg)
        }
      }
    }))
  }

  async mounted() {
    this.poolModel = getPoolModelByName(this.pool_name)

    // this.chainIndicesLoader.initial()
    this.walletLoader.initial()
    //this.balanceLoader.initial()
    // this.swapActor.initial()
    this.poolTokensLoader.initial()
    // When fetch wallet on mounted event, we will not popup metamask by setting reconnect=true
    await this.walletLoader.$fetch({ reconnect: true })
    this.poolTokensLoader.$fetch()
  }

  @Watch('selectAction')
  onSelectAction() {
    if (this.selectAction.length > 0) {
      this.isOnAction = true
    }
  }

  onSubmit(sumUsdPrice: any) {
    this.totalValueLocked = sumUsdPrice
    console.log('sumUsdPrice', sumUsdPrice)
  }

  numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
</script>

<style lang="scss" scoped>
.action-title {
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
  }
}
</style>
