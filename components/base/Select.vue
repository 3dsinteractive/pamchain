<template>
  <div>
    <!-- <h5 class="grey--text text--darken-2  mb-1" :style="isHeaderShow" >{{ label }}
      <span class="red--text" v-if="isRequired">&nbsp;*</span>
    </h5> -->
    <h5
      v-if="label !== undefined"
      class="grey--text text--darken-2 text-capitalize mb-1"
    >
      {{ label }}
      <span v-if="isRequired" class="red--text">&nbsp;*</span>
    </h5>
    <v-select
      :style="selectorWidth ? `width: ${selectorWidth}` : ''"
      :rules="rules"
      class="select-custom"
      :placeholder="placeholder ? placeholder : label"
      :items="options"
      :value="innerValue"
      item-text="label"
      item-value="value"
      outlined
      dense
      :disabled="disabled"
      :hide-details="isHideDetail"
      @input="onInput"
      @change="$emit('onChange')"
    >
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import BaseInput from '~/core/BaseInput'
import RuleHelper from '~/utils/RuleHelper'

@Component
export default class Select extends BaseInput {
  @Prop({ default: true }) headerDisplayStatus!: boolean
  @Prop(String) readonly selectorWidth!: string

  get isHeaderShow(): any {
    return {
      display: this.headerDisplayStatus ? 'initial' : 'none'
    }
  }

  onSelfInput(value: any) {
    this.onInput(value)
  }

  get getLabel() {
    return this.isRulesHasRequired
      ? `${this.label} <span class="red--text">&nbsp;*</span>`
      : this.label
  }

  get isRulesHasRequired(): boolean {
    return this.rules?.find((r) => r === RuleHelper.required)
  }
}
</script>

<style lang="scss">
.select-custom.theme--light.v-input--is-disabled .v-input__slot,
.select-custom.theme--dark.v-input--is-disabled .v-input__slot {
  background: none !important;
}

.select-custom.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: none;
}
</style>
