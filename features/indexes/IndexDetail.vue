<template>
  <div>
    <v-card class="rounded-lg custom-shadow pa-4">
      <h3 class="mb-4">Detail</h3>
      <p class="accent--text">
        Focus on holding the new tokens that has high potential to growth.
      </p>
    </v-card>
    <div class="py-5 px-6 d-flex flex-column">
      <ButtonSecondary
        :fullWidth="true"
        :despressed="true"
        @click="onEtherscan"
      >
        View on Etherscan
      </ButtonSecondary>
      <ButtonSecondary
        :fullWidth="true"
        :despressed="true"
        @click="onUniswap"
        class="my-4"
      >
        Buy on Uniswap
      </ButtonSecondary>
      <ButtonSecondary
        :fullWidth="true"
        :despressed="true"
        @click="onQuickswap"
      >
        Buy on Quickswap
      </ButtonSecondary>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'

@Component
export default class IndexDetail extends BaseApp {
  async mounted() {}

  onEtherscan() {}

  onUniswap() {}

  onQuickswap() {}
}
</script>
