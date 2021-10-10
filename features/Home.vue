<template>
  <div>
    <section id="intro" class="bg-dark">
      <div class="page-container py-8">
        <HomeJumbotron/>
        <v-row class="mt-8">
          <v-col cols="12" md="4" v-for="(item, index) in indices" :key="index">
            <IndexCard :item="item"/>
          </v-col>
        </v-row>
      </div>
    </section>
    <section class="bg-white">
      <HomeVault/>
    </section>
    <section class="bg-white">
      <HomeStaking/>
    </section>
  </div>
</template>

<script lang="ts">

import {BaseApp} from '~/core/Base'
import {Component} from 'vue-property-decorator'
import HomeJumbotron from '~/features/home/HomeJumbotron.vue'
import HomeStaking from '~/features/home/HomeStaking.vue'
import HomeVault from '~/features/home/HomeVault.vue'
import IndexCard from '~/features/indexes/IndexCard.vue'
import { getPoolModelByName } from '~/constants/chainAddress'
import { PoolModel } from '~/models/types'

@Component({
  components: {
    HomeJumbotron,
    IndexCard,
    HomeStaking,
    HomeVault
  }
})
export default class Home extends BaseApp {

  indices: PoolModel[] = []
  
  async mounted() {
     const poolNames = ["devil3", "angel5", "scbx10"]
    const values = [5.68, 9.77, 15.39]
    const totalValues = [27558042.2, 14435960, 39434561]
    let pools: PoolModel[] = []
    for(let i in poolNames){
      let item: PoolModel  = getPoolModelByName(poolNames[i])
      item.value = values[i]
      item.totalValue  = totalValues[i]
      pools.push(item)
    }
    this.indices = pools;
  }
}
</script>