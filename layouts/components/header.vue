<template>
  <header>
    <v-toolbar color="mainDark" fixed height="100">
      <div class="page-container d-flex justify-space-between align-center">
        <v-toolbar-title
          ><img src="/logo.svg" class="mt-2 cursor-pointer" @click="goToHome"
        /></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down pr-5">
          <NuxtLink :to="item.link" v-for="(item, index) in menu" :key="index">
            <h3 class="white--text my-0 ml-12 primary-hover">
              {{ item.title }}
            </h3>
          </NuxtLink>
        </v-toolbar-items>
        <v-icon
          class="hidden-md-and-up"
          @click="openMobileMenu = !openMobileMenu"
          >mdi-menu</v-icon
        >
        <div>
          <ButtonSuccess
            v-if="
              this.walletLoader.fetchItems == null ||
              this.walletLoader.fetchItems.length == 0
            "
            @click="connectMetamask()"
            >Connect With Metamask</ButtonSuccess
          >
        </div>
      </div>
    </v-toolbar>
    <div v-show="openMobileMenu">
      <v-list rounded>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, index) in menu"
            :key="index"
            :to="item.link"
            router
            @click="openMobileMenu = false"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Provide, Watch } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'
import { ContractLoader } from '~/loader/contract'
import { WalletLoader } from '~/loader/wallet'
import { AbiItem } from 'web3-utils'
import { ERC20Token } from '~/types/web3-v1-contracts/ERC20Token'
import Erc20Contract from '../../build/contracts/ERC20Token.json'
import { ERC20TokenAddress } from '~/constants/chainAddress'
import FormRepository from '~/repositories/FormRepository'
import { IndexPool } from '~/types/web3-v1-contracts/IndexPool'
import IndexPoolContract from '../../build/contracts/IndexPool.json'

@Component({
  components: {},
})
export default class Header extends BaseApp {
  @Provide('form_name') form_name = 'play_form'

  get formRepo(): FormRepository {
    return new FormRepository(this)
  }

  mounted() {
    this.walletLoader.initial()
    this.balanceLoader.initial()

    // When fetch wallet on mounted event, we will not popup metamask by setting reconnect=true
    this.walletLoader.$fetch({ reconnect: true })
  }

  menu: any[] = [
    {
      title: 'PAM Indexes',
      link: '/indexes',
    },
    {
      title: 'Vaults',
      link: '/#vaults'
    },
    {
      title: 'Staking',
      link: '/#staking'
    },
    {
      title: 'How it works',
      link: '/play'
    }
  ]

  openMobileMenu = false

  goToHome() {
    this.$router.push('/')
  }

  connectMetamask() {
    this.walletLoader.$fetch()
  }

  getERC20Contract(addr: string): ERC20Token {
    return new this.$web3.eth.Contract(
      Erc20Contract.abi as AbiItem[],
      addr,
    ) as any as ERC20Token
  }

  get walletAddress() {
    const addrs = this.walletLoader.fetchItems
    if (addrs && addrs.length > 0) {
      return addrs[0]
    }
    return null
  }

  get walletLoader(): WalletLoader {
    return new WalletLoader(this, (data: any) => ({
      onFetchSuccess: (newValue: any) => {
        this.balanceLoader.$fetch()
        this.formRepo.updateAttr(this.form_name, 'terminal', this.walletAddress)
      },
    }))
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
            `err = ${errmsg}`,
          )
        }
      },
    }))
  }
}
</script>
