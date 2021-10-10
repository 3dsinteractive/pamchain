<template>
  <div>
    <h5
      v-if="label !== undefined"
      class="grey--text text--darken-2 text-capitalize mb-1"
    >
      {{ label }}
      <span v-if="isRequired" class="red--text">&nbsp;*</span>
    </h5>
    <v-text-field
      :class="`input-custom ${className ? className : ''}`"
      :rules="rules"
      :append-icon="icon"
      :name="name"
      :placeholder="placeholder || label"
      :value="value"
      color="primary"
      :height="height || 40"
      :disabled="disabled"
      :prefix="prefix"
      :suffix="suffix"
      background-color="white"
      :loading="isLoading"
      :hide-details="isHideDetail"
      outlined
      dense
      @input="onInput"
      @click="onEmitEvent"
      @keyup="onEmitEvent"
      @blur="onBlur"
    >
      <template #progress>
        <div class="d-flex align-center">
          <LoadingCircular size="20" width="2" />
        </div>
      </template>

      <template v-if="iconImg" #prepend-inner>
        <img class="asset-logo mr-2" :src="iconImg" />
      </template>

      <template v-if="prependOuterText" #prepend>
        <label
          class="custom-prepend-outer-label v-label theme--light mr-2"
          style="padding-top: 2px"
          >{{ prependOuterText }}</label
        >
      </template>

      <template v-if="appnedOuterText" #append-outer>
        <label
          class="custom-append-outer-label v-label theme--light mr-2"
          style="padding-top: 2px"
          >{{ appnedOuterText }}</label
        >
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import BaseInput from '~/core/BaseInput'
import { _isEmpty, _isUndefined } from '~/utils/lodash'

@Component
export default class InputText extends BaseInput {
  @Prop() isLoading?: boolean
  @Prop() appnedOuterText?: string
  @Prop() prependOuterText?: string
  @Prop() iconImg?: string
  @Prop({ type: Object }) personalize?: {
    text?: string
    pos?: number
    databases?: string[]
    disabled?: boolean
  }

  @Prop({ default: false }) isDeletable?: boolean

  get isPersonalize(): boolean {
    return !(_isUndefined(this.personalize) || _isEmpty(this.personalize))
  }

  onEmitEvent(ev: any) {
    this.$emit('event', ev)
  }

  onBlur(ev: any) {
    this.$emit('blur', ev)
  }
}
</script>

<style lang="scss">
.input-custom.theme--light .v-input__slot,
.input-custom.theme--dark .v-input__slot {
  background: none !important;
}

.input-custom.theme--light.v-input--is-disabled .v-input__slot,
.input-custom.theme--dark.v-input--is-disabled .v-input__slot {
  background: none !important;
}

.asset-logo {
  height: 20px;
  width: auto;
}
</style>
