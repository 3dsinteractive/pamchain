<template>
  <div style="background:white;">
    <v-row class="mx-auto py-16" style="width: 60%;">
      <v-col cols="12" md="8">
        <h1 class="black--text">STAKING</h1>
        <p class="black--text" style="front-size:16px;">Provide liquidity for our index products on major decentralised exchanges and earn our protocol governance token as a reward! Select index products are also eligible for rewards by staking them single-sided. No fees, no lock-up periods.</p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex flex-column">
        <div class="mt-auto">
          <ButtonSuccess :fullWidth="true" class="mb-2">STAKE NOW</ButtonSuccess>
          <ButtonGray :fullWidth="true">READ MORE</ButtonGray>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import {Base} from '~/core/Base'
import {Component} from 'vue-property-decorator'

@Component
export default class HomeStaking extends Base {
}
</script>