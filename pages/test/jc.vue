<template>
  <div>
    <v-row>
      <v-col cols="6">
        <IndexDetail />
      </v-col>
      <v-col cols="6">
        <IndexGraph />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <IndexAssetList />
      </v-col>
      <v-col cols="6">
        <IndexRecentTrades />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'
import IndexDetail from '~/features/indexes/IndexDetail.vue'
import IndexGraph from '~/features/indexes/IndexGraph.vue'
import IndexAssetList from '~/features/indexes/IndexAssetList.vue'
import IndexRecentTrades from '~/features/indexes/IndexRecentTrades.vue'

@Component({
  components: {
    IndexDetail,
    IndexGraph,
    IndexAssetList,
    IndexRecentTrades
  }
})
export default class BasePage extends BaseApp {
}
</script>
