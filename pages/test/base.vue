<template>
  <div>
    <ButtonPrimary>Sample Button</ButtonPrimary>
    <ButtonSecondary>Sample Button</ButtonSecondary>
    
  </div>
</template>

<script lang="ts">

import {BaseApp} from '~/core/Base'
import {Component} from 'vue-property-decorator'

@Component({
  components: {},
})
export default class BasePage extends BaseApp {
}
</script>
