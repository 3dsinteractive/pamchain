<template>
  <section class="bg-dark">
    <div class="page-container py-8" style="border-top: 1px solid #393C3E"> 
      <h2 class="cursor-pointer d-inline" @click="linkBack">
        <v-icon class="mr-2" color="white">mdi-chevron-left</v-icon> {{title}}
      </h2>
    </div>
  </section>
</template>

<script lang="ts">

import {Base} from '~/core/Base'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class BackNav extends Base {
  @Prop(String) readonly link!: string
  @Prop(String) readonly title!: string

  linkBack() {
    this.$router.push(this.link)
  }
}
</script>