<template>
  <v-card flat color="background" class="pa-4 rounded-lg">
    <h2 class="mb-4">Assets</h2>
    <div>
      <div v-for="(poolToken, idx) in poolTokens" :key="idx">
        <IndexAssetItem :item="poolToken" />
        <v-divider v-if="idx != poolTokens.length - 1" class="my-4" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Provide } from 'vue-property-decorator'
import { AbiItem } from 'web3-utils'
import IndexPoolContract from '../../build/contracts/IndexPool.json'
import Erc20Contract from '../../build/contracts/ERC20Token.json'
import { ERC20TokenModel } from '../../models/types'
import { BaseApp } from '~/core/Base'
import IndexAssetItem from '~/features/indexes/IndexAssetItem.vue'
import { ContractLoader } from '~/loader/contract'
import { IndexPool } from '~/types/web3-v1-contracts/IndexPool'
import { WalletLoader } from '~/loader/wallet'
import FormRepository from '~/repositories/FormRepository'
import { ERC20Token } from '~/types/web3-v1-contracts/ERC20Token'
import { ERC20TokenAddress, PoolsAddress, getERC20TokenModelByAddress } from '~/constants/chainAddress'
import BN from 'bn.js'
import { PageLoader } from '~/loader/page'
import { API_TYPE } from '~/constants/apiTypes'
import { Core } from '~/core/Core'

@Component({
  components: {
    IndexAssetItem
  }
})
export default class IndexAssetList extends BaseApp {
  poolTokens: ERC20TokenModel[] = []

  @Provide('form_name') form_name = 'play_form'
  getERC20Contract(addr: string): ERC20Token {
    return new this.$web3.eth.Contract(
      Erc20Contract.abi as AbiItem[],
      addr
    ) as any as ERC20Token
  }

  getPoolContract(addr: string): IndexPool {
    return new this.$web3.eth.Contract(
      IndexPoolContract.abi as AbiItem[],
      addr,
      { from: this.walletAddress }
    ) as any as IndexPool
  }

  getPoolTokens() {
    this.poolTokensLoader.$fetch()
  }

  get poolTokensPrintable(): string {
    return JSON.stringify(this.poolTokens, null, 2)
  }

  get walletLoader(): WalletLoader {
    return new WalletLoader(this, (data: any) => ({
      onFetchSuccess: (newValue: any) => {
        this.poolTokensLoader.$fetch()
        // this.balanceLoader.$fetch()
        // this.formRepo.updateAttr(this.form_name, 'terminal', this.walletAddress)
      }
    }))
  }

  get formRepo(): FormRepository {
    return new FormRepository(this)
  }

  get balanceLoader(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        // const web3 = this.$web3
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

  get walletAddress() {
    const addrs = this.walletLoader.fetchItems
    if (addrs && addrs.length > 0) {
      return addrs[0]
    }
    return null
  }

  mounted() {
    this.walletLoader.initial()
    this.balanceLoader.initial() 
   // this.poolTokensLoader.initial()

    // When fetch wallet on mounted event, we will not popup metamask by setting reconnect=true
    this.walletLoader.$fetch({ reconnect: true })
  }

  get poolTokensLoader(): ContractLoader {
    return new ContractLoader(this, (data: any) => ({
      handle: async () => {
        const web3 = this.$web3
        const contract = this.getPoolContract(PoolsAddress.DEVIL3)

        try {
          const tokenAddrs = await contract.methods.getCurrentTokens().call()

          const poolTokens = []
          let sumUsdPrice = 0
          for (let i = 0; i < tokenAddrs.length; i++) {
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
            const erc20: ERC20TokenModel =
              getERC20TokenModelByAddress(tokenAddr)

            const balance = web3.utils.fromWei(tokenRecord.balance)
            const b = parseInt(balance)
            const u = erc20.usdRatio || 0
            const usdPrice = b * u

            const balanceSplit = balance.split('.')
            let balanceText = balanceSplit[0]
            if (balanceSplit.length > 1) {
              balanceText = balanceText + '.' + balanceSplit[1].substring(0, 2)
            }

            erc20.balance = balanceText
            erc20.weight = web3.utils.fromWei(
              ((tokenRecord.denorm / 26) * 100).toString()
            )
            erc20.usdPrice = usdPrice
            sumUsdPrice += usdPrice
            poolTokens.push(erc20)
          }
          this.poolTokens = poolTokens
          this.$emit('submit', sumUsdPrice)
          // this.formRepo.updateAttr(this.form_name, 'terminal', `res = ${this.poolTokensPrintable}`)
        } catch (err: any) {
          const errmsg = this.$web3Helper.errorMessage(err)
          alert(errmsg)
          // this.formRepo.updateAttr(this.form_name, 'terminal', `err = ${errmsg}`)
        }
      }
    }))
  }


  //  "name": "DAI",
  //   "symbol": "DAI",
  //   "price": "516",
  //   "weight": "2.6"

  // items = [
  //   {
  //     name: 'REN',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '1916155.79',
  //     value: '2,203,579.16xxxxx',
  //     ratio: '16.16'
  //   },
  //   {
  //     name: '1INCH',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '534444.60',
  //     value: '1,646,119.19',
  //     ratio: '11.92'
  //   },
  //   {
  //     name: 'RSR',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '42407309.31',
  //     value: '1,489,887.94',
  //     ratio: '10.84'
  //   },
  //   {
  //     name: 'ALPHA',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '42407309.31',
  //     value: '1,489,887.94',
  //     ratio: '10.07'
  //   },
  //   {
  //     name: 'OCEAN',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '42407309.31',
  //     value: '1,489,887.94',
  //     ratio: '9.41'
  //   },
  //   {
  //     name: 'WOO',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '1916155.79',
  //     value: '2,203,579.16',
  //     ratio: '8.91'
  //   },
  //   {
  //     name: 'MIR',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '534444.60',
  //     value: '1,646,119.19',
  //     ratio: '8.71'
  //   },
  //   {
  //     name: 'RGT',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '42407309.31',
  //     value: '1,489,887.94',
  //     ratio: '8.61'
  //   },
  //   {
  //     name: 'BADGER',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '42407309.31',
  //     value: '1,489,887.94',
  //     ratio: '6.84'
  //   },
  //   {
  //     name: 'POLS',
  //     logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     amount: '42407309.31',
  //     value: '1,489,887.94',
  //     ratio: '5.77'
  //   }
  // ]
}
</script>

<style scoped></style>
