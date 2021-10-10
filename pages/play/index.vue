<template>
  <Play />
</template>

<script lang="ts">

import {BaseApp} from '~/core/Base'
import Play from "~/features/Play.vue";
import {Component} from 'vue-property-decorator'

@Component({
  layout: 'none',
  components: {Play},
})
export default class PlayPage extends BaseApp {
}
</script>
