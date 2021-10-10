<template>
  <v-app>
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'

@Component
export default class App extends BaseApp {}
</script>
