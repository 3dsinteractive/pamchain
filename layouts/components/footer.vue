<template>
  <footer>
    <div style="background-color:#EFF5F9;">
      <div class="page-container py-5">
        <h4 class="black--text cursor-pointer d-inline" @click="scrollToTop">
          <v-icon class="mr-2" color="black">mdi-chevron-up</v-icon> Back To Top
        </h4>
      </div>
    </div>
    <div class="py-12 mainDark">
      <div class="page-container d-flex justify-space-between align-start px-4 px-md-0">
        <div class="d-md-flex">
          <img src="/logo-3ds-white.png" style="max-height:56px;" class="mt-2 mr-8">
          <p>
            3DS Interactive Co.,Ltd.<br> 
            248 Krungthonburi road, Klongtonsai,<br> 
            Klongsan, Bangkok Thailand 10600
          </p>
        </div>
        <div>
          <h4 class="secondary--text">Report an issue</h4>
          <p>Email Us: contact@3dsinteractive.com</p>
          <small>&copy; PAMCHAIN</small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator'
import {BaseApp} from '~/core/Base'

@Component({
  components: {}
})
export default class Footer extends BaseApp {
  menu: any[] = [
    {
      title: 'PAM Indexes',
      link: '/#index'
    },
    {
      title: 'Vaults',
      link: '/#vaults'
    },
    {
      title: 'Staking',
      link: '/#staking'
    },
    {
      title: 'How it works',
      link: '/play'
    }
  ]

  openMobileMenu = false

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
</script>
