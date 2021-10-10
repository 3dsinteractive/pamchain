import Vue from 'vue'
import Web3 from 'web3'
import AppRepository from '~/repositories/AppRepository'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { StringHelper } from '~/utils/StringHelper'
import { TimeHelper } from '~/utils/TimeHelper'
import { Web3Helper } from '~/utils/Web3Helper'
import { WalletLoader } from '~/loader/wallet'
import { IWalletLoaderOption } from '~/loader/types'

export class Base extends Vue {
  $store!: any
  $refs!: any
  $app!: AppRepository
  $cookies!: any
  $router!: any
  $vuetify!: any
  $toast!: any
  $papa!: any
  $msal!: any
  $eth!: any

  getWalletLoader(options: (data?: any) => IWalletLoaderOption): WalletLoader {
    return new WalletLoader(this, options)
  }

  get $web3(): Web3 {
    return this.$eth.web3
  }

  get $web3Helper() {
    return Web3Helper
  }

  get $array() {
    return ArrayHelper
  }

  get $string() {
    return StringHelper
  }

  get $time() {
    return TimeHelper
  }
}

export class BaseApp extends Base {}
