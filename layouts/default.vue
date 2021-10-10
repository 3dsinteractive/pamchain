<template>
  <v-app>
    <Header />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import { BaseApp } from '~/core/Base'
import AppRepository from '~/repositories/AppRepository'

@Component({
  components: { Header, Footer },
  head() {
    const app = new AppRepository(this as any)
    return {
      title: app.state.app.doc.title
    }
  }
})
export default class App extends BaseApp {}
</script>

<style lang="scss">
@import '~/assets/styles/main.scss';
</style>
