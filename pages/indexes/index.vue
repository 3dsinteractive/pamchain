<template>
  <IndexList />
</template>

<script lang="ts">

import {BaseApp} from '~/core/Base'
import IndexList from "~/features/IndexList.vue";
import {Component} from 'vue-property-decorator'

@Component({
  components: {IndexList},
})
export default class IndexListPage extends BaseApp {
}
</script>
