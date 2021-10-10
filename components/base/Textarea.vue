<template>
  <div>
    <div class="d-flex">
      <h5 class="grey--text text--darken-2 text-capitalize mb-1">
        {{ label }}
        <span v-if="isOptional" class="optional-text">(Optional)</span>
        <span v-if="isRequired && label" class="red--text">&nbsp;*</span>
      </h5>
    </div>
    <v-row>
      <v-col class="py-0">
        <v-textarea
          class="textarea-custom"
          :rules="rules"
          :append-icon="icon"
          :name="name"
          :placeholder="placeholder ? placeholder : label"
          :value="value"
          color="primary"
          :background-color="backgroundColor"
          :rows="rowsAmount"
          :height="height"
          outlined
          dense
          no-resize
          :disabled="disabled"
          :hint="hint"
          :hide-details="isHideDetail"
          @input="onInput"
          @click="onEmitEvent"
          @keyup="onEmitEvent"
        >
        </v-textarea>
      </v-col>
      <v-col v-if="isDeletable" class="col-auto pl-0 py-0">
        <ButtonError
          type="button"
          :icon-only="true"
          icon="mdi-trash-can"
          @click="$emit('onDelete')"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import BaseInput from '~/core/BaseInput'

@Component
export default class Textarea extends BaseInput {
  @Prop({ default: 'transparent' }) readonly backgroundColor!: string
  @Prop({ default: '4' }) readonly rowsAmount!: string
  @Prop() hint?: string
  @Prop({ default: false }) isOptional!: boolean
  @Prop({ default: false }) isDeletable?: boolean

  onEmitEvent(ev: any) {
    this.$emit('event', ev)
  }
}
</script>
