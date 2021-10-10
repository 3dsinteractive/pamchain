<template>
  <div>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-btn x-small color="green" @click="clickUseMax">USE MAX</v-btn>
            <b>Balance: </b>
            <img :src="getCoinIcon(walletCoinName)" height="20" />
            <span class="green-text">{{ walletBalance }}</span>
            <span>{{ walletCoinName }}</span>
          </v-col></v-row
        >
        <v-row v-if="overBalance"
          ><v-col class="red-text">Not enough balance</v-col></v-row
        >
        <v-row>
          <v-col>
            <Field v-model="form" :options="formFields" />
          </v-col>
        </v-row>

        <div class="line-container">
          <v-divider class="mt-8 mb-12"></v-divider>
          <div class="line-overlay-icon">
            <v-icon>mdi-arrow-down</v-icon>
          </div>
        </div>
        <v-row>
          <v-col>
            <Field v-model="form" :options="formFieldsTrade" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div style="text-align: center">
              <ButtonPrimary style="width: 80%" @click="onClickMint()"
                >MINT</ButtonPrimary
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide } from 'vue-property-decorator'
import { IFormOption, INPUT_TYPES } from '~/components/form/FormTypes'
import Field from '~/components/form/Field.vue'
import { BaseForm } from '~/core/BaseForm'
import { ERC20TokenModel } from '~/models/types'
import {
  getERC20AddressByName,
  getERC20TokenModelByAddress
} from '~/constants/chainAddress'

@Component({
  components: { Field }
})
export default class IndexActionBurn extends BaseForm<any> {
  @Prop(String) readonly action!: string
  @Prop(String) readonly type!: string
  @Prop(String) readonly index!: string
  @Prop(String) readonly icon!: string
  @Prop() readonly pool_tokens!: ERC20TokenModel[]

  @Provide('form_name') form_name = 'mint_form'

  @Prop(String) readonly walletBalance!: string
  @Prop(String) readonly walletCoinName!: string
  @Prop(Number) readonly mintRate!: number

  defaultInputCoin = 'ETH'

  mounted() {
    setTimeout(() => {
      this.$emit('change-coin-in', this.defaultInputCoin)
    }, 2000)
  }

  get overBalance() {
    return Number(this.form.balance) > Number(this.walletBalance)
  }

  calcualteEstimateMint(input: string) {
    if (Number(input) > Number(this.walletBalance)) {
      input = this.walletBalance
    }
    const estiomateMint = Number(input) * this.mintRate * 0.8

    if (!isNaN(estiomateMint)) {
      this.formRepo.updateAttr(this.form_name, 'estimateMint', estiomateMint)
      this.formRepo.updateAttr(this.form_name, 'balance', input)
    } else {
      this.formRepo.updateAttr(this.form_name, 'estimateMint', '0.00')
    }
  }

  clickUseMax() {
    this.calcualteEstimateMint(this.walletBalance)
  }

  getCoinIcon(coinName: string) {
    const tokenAddress = getERC20AddressByName(coinName)
    const tokenModel = getERC20TokenModelByAddress(tokenAddress)
    return tokenModel.icon
  }

  get walletBalanceText() {
    return 'Balance: ' + this.walletBalance + ' ' + this.walletCoinName
  }

  get formFields(): IFormOption[] {
    return [
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-7',
        props: {
          name: 'balance',
          label: 'Input',
          placeholder: '',
          defaultValue: '0.00',
          on: {
            change: (e: any) => {
              this.calcualteEstimateMint(e)
            }
          }
        }
      },
      {
        type: INPUT_TYPES.SELECT,
        className: 'col-5',
        props: {
          name: 'from',
          label: 'From',
          placeholder: '',
          defaultValue: this.defaultInputCoin,
          options: this.walletAndBalance,
          on: {
            change: (e: any) => {
              this.formRepo.updateAttr(this.form_name, 'balance', '0.00')
              this.$emit('change-coin-in', e)
            }
          }
        }
      }
    ]
  }

  get formFieldsTrade(): IFormOption[] {
    return [
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-7',
        props: {
          name: 'estimateMint',
          label: 'Estimate Mint',
          placeholder: '',
          defaultValue: '0.00'
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-5 text-uppercase',
        props: {
          name: 'to',
          label: 'To',
          placeholder: '',
          iconImg: this.icon,
          defaultValue: this.index,
          disabled: true
        }
      }
    ]
  }

  get walletAndBalance() {
    const wallet: any[] = []
    for (const i in this.pool_tokens) {
      const coin = this.pool_tokens[i]
      wallet.push({
        value: coin.name,
        label: coin.name,
        iconImg: coin.icon
      })
    }
    return wallet
  }

  onClickMint() {
    this.$emit('click-mint', {
      token: this.defaultInputCoin,
      in: this.form.balance,
      out: this.form.estimateMint
    })
  }
}
</script>

<style lang="scss" scoped>
.green-text {
  color: #47eacc;
}
.line-container {
  position: relative;
  .line-overlay-icon {
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1d1f20;
    top: -16px;
    left: 50%;
  }
}
.red-text {
  font-size: 12px;
  color: red;
}
</style>
