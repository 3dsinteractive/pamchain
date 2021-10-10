<template>
  <div>
    <v-row>
      <v-col>
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
              <ButtonPrimary style="width: 80%" @click="onClick()"
                >SEND</ButtonPrimary
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Base } from '~/core/Base'
import { Component, Prop, Provide } from 'vue-property-decorator'
import { IFormOption, INPUT_TYPES } from '~/components/form/FormTypes'
import { _get, _isUndefined } from '~/utils/lodash'
import Field from '~/components/form/Field.vue'
import { BaseForm } from '~/core/BaseForm'
import { ERC20TokenModel, PoolModel } from '~/models/types'

@Component({
  components: { Field }
})
export default class IndexActionBurn extends BaseForm<any> {
  @Prop(String) readonly action!: string
  @Prop(String) readonly type!: string
  @Prop(String) readonly index!: string
  @Prop(String) readonly icon!: string

  @Provide('form_name') form_name = 'burn_form'

  @Prop() readonly pool_tokens!: ERC20TokenModel[]

  get formFields(): IFormOption[] {
    return [
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-7',
        props: {
          name: 'balance',
          label: 'No balance',
          placeholder: '',
          defaultValue: '0.00'
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-5',
        props: {
          name: 'form',
          label: 'form',
          placeholder: '',
          iconImg: this.icon,
          defaultValue: this.index,
          disabled: true
        }
      }
    ]
  }

  get formFieldsTrade(): IFormOption[] {
    let res: IFormOption[] = []
    if (this.action === 'mint') {
      res = [
        {
          type: INPUT_TYPES.TEXT,
          className: 'col-7',
          props: {
            name: 'balance',
            label: 'No balance',
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
    } else {
      res = [
        {
          type: INPUT_TYPES.TEXT,
          className: 'col-7',
          props: {
            name: 'balance',
            label: 'No balance',
            placeholder: '',
            defaultValue: '0.00'
          }
        },
        {
          type: INPUT_TYPES.SELECT,
          className: 'col-5',
          props: {
            name: 'to',
            label: 'To',
            placeholder: '',
            defaultValue: 'ETH',
            options: [
              {
                value: 'ETH',
                label: 'ETH'
              }
            ]
          }
        }
      ]
    }
    return res
  }

  onClick() {}
}
</script>

<style lang="scss" scoped>
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
</style>
