<template>
  <v-card color="mainDark" class="rounded-lg custom-shadow theme-background">
    <v-row class="mx-auto py-16" style="width: 72%;">
      <v-col cols="12" md="8">
        <h1 class="primary--text">PAM INDEXES</h1>
        <p>Gain exposure to passively-managed crypto index portfolios represented by a single token.</p>
        <h1 class="primary--text">Index pools</h1>
        <p>Gain exposure to a passively-managed, zero management fee crypto index portfolio with a single token. PAMCHAIN products offer a hassle-free, battle-tested way of investing in both DeFi and niche market sectors such as oracles or the metaverse.</p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex flex-column">
        <div class="mt-auto">
          <ButtonPrimary :fullWidth="true" class="mb-2">BUY AN INDEX</ButtonPrimary>
          <ButtonSecondary :fullWidth="true">LEARN MORE</ButtonSecondary>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">

import {Base} from '~/core/Base'
import {Component} from 'vue-property-decorator'

@Component
export default class HomeJumbotron extends Base {
}
</script>