<template>
  <v-btn
    color="success"
    :class="iconOnly ? 'px-0 black--text' : 'black--text'"
    height="48"
    :block="fullWidth"
    rounded
    :depressed="despressed"
    @click="$emit('click')"
  >
    <v-icon v-if="icon != undefined" :class="iconOnly ? '' : 'mr-2'" small>{{
      icon
    }}</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { Base } from '~/core/Base'

@Component
export default class ButtonSuccess extends Base {
  @Prop(String) readonly icon!: string
  @Prop(Boolean) readonly fullWidth!: boolean
  @Prop(Boolean) readonly iconOnly!: boolean
  @Prop(Boolean) readonly disabled!: boolean
  @Prop({ default: false }) readonly despressed!: boolean
  @Prop({ type: String, default: 'submit' }) readonly type!: string
}
</script>

<style lang="scss"></style>
