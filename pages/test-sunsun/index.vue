<template>
  <Test />
</template>

<script lang="ts">

import {BaseApp} from '~/core/Base'
import Test from "~/features/Test.vue";
import {Component} from 'vue-property-decorator'

@Component({
  layout: 'none',
  components: {Test},
})
export default class PlayPage extends BaseApp {
}
</script>
