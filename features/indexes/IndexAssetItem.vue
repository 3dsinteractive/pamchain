<template>
  <v-card flat color="background">
    <v-row class="d-flex align-center">
      <v-col>
        <v-row>
          <v-col cols="auto" class="pb-0">
            <h3>{{ item.balance }}</h3>
          </v-col>
          <v-col class="px-0 pb-0 d-flex align-center">
            <img class="asset-logo mr-2" :src="item.icon" alt="asset-logo" />
            <h3>{{ item.name }}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0">
            <h4 class="primary--text">
              {{ activedCurrency }}{{ numberWithCommas(item.usdPrice) }}
            </h4>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto" class="mx-4">
        <v-progress-circular
          :rotate="-90"
          :size="75"
          :width="8"
          :value="item.weight"
          color="primary"
        >
          <v-slot class="ratio-text white--text"> {{ item.weight }}% </v-slot>
        </v-progress-circular>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'
import { ERC20TokenModel } from '~/models/types'

@Component
export default class IndexAssetItem extends BaseApp {
  @Prop() readonly item!: ERC20TokenModel

  activedCurrency = '$'
  numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
</script>

<style scoped>
.asset-logo {
  height: 20px;
  width: auto;
}
.ratio-text {
  font-family: 'Roboto Condensed', sans-serif !important;
  font-weight: 400 !important;
}
</style>
