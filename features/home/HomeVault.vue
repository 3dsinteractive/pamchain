<template>
  <div style="background:backgroundLight;">
    <v-row class="mx-auto py-16" style="width: 60%;">
      <v-col cols="12" md="8">
        <h1 class="primary--text">VAULTS</h1>
        <p class="white--text" style="front-size:16px;">Lend out your assets via PAMCHAIN Earn and receive the guaranteed best interest rates across the major lending protocols in DeFi. Low-fee and no-maintenance: let our non-custodial vaults do the work of allocating your funds for maximum impact.</p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex flex-column">
        <div class="mt-auto">
          <ButtonDark :fullWidth="true" class="mb-2">EXPLORE VAULTS</ButtonDark>
          <ButtonDarkGray :fullWidth="true">HOW IT WORKS</ButtonDarkGray>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

import {Base} from '~/core/Base'
import {Component} from 'vue-property-decorator'

@Component
export default class HomeVault extends Base {
}
</script>