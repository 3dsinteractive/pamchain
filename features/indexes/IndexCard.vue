<template>
  <v-card @click="linkToDetail" color="background" class="rounded-lg custom-shadow bg-hover cursor-pointer pa-4">
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <v-avatar size="30" class="mr-2">
          <img
            :src="item.icon"
            :alt="item.name"
          >
        </v-avatar>
        <h2>{{item.name}}</h2>
      </div>
      <h2>${{item.value}}</h2>
    </div>
    <p class="accent--text" style="min-height:50px" >
      {{item.description}}
    </p>
    <div class="d-flex justify-space-between mt-2">
      <h4>Total Value Locked</h4>
      <h4 class="secondary--text">${{numberWithCommas(item.totalValue)}}</h4>
    </div>
  </v-card>
</template>

<script lang="ts">

import {Base} from '~/core/Base'
import {Component, Prop} from 'vue-property-decorator'
import { PoolModel } from '~/models/types'

@Component
export default class IndexCard extends Base {
  @Prop() readonly item!: PoolModel

  linkToDetail() {
    this.$router.push(`/indexes/${this.item.name}`)
  }

  numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
</script>