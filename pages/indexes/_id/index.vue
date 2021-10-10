<template>
  <div>
    <IndexView :pool_name="$route.params.id" />
  </div>
</template>

<script lang="ts">
import { BaseApp } from '~/core/Base'
import IndexView from '~/features/IndexView.vue'
import { Component } from 'vue-property-decorator'

@Component({
  components: { IndexView },
})
export default class IndexViewPage extends BaseApp {}
</script>
