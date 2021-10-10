<template>
  <v-card style="width:50%;">
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            BUY DEVIL3
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Field :options="formFields" v-model="form" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span><hr/></span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Field :options="formFieldsTrade" v-model="form" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div style="text-align:center;">
              <ButtonPrimary style="width:30%;">Send</ButtonPrimary>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {Base} from '~/core/Base'
import {Component, Prop, Provide} from 'vue-property-decorator'
import {IFormOption, INPUT_TYPES} from '~/components/form/FormTypes';
import {_get, _isUndefined} from '~/utils/lodash';
import Field from '~/components/form/Field.vue';
import { BaseForm } from '~/core/BaseForm';

@Component({
  components: {Field}
})
export default class IndexBuy extends BaseForm<any> {

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
        type: INPUT_TYPES.SELECT,
        className: 'col-5',
        props: {
          name: 'form',
          label: 'form',
          placeholder: '',
          defaultValue: 'ETH',
          options:[
            {
              value: 'ETH',
              label: 'ETH'
            }
          ]
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
          defaultValue: 'DEVIL3',
          options:[
            {
              value: 'DEVIL3',
              label: 'DEVIL3'
            }
          ]
        }
      }
    ]
  }
}
</script>