<template>
  <Home />
</template>

<script lang="ts">

import {BaseApp} from '~/core/Base'
import Home from "~/features/Home.vue";
import {Component} from 'vue-property-decorator'

@Component({
  components: {Home},
})
export default class IndexPage extends BaseApp {
}
</script>
