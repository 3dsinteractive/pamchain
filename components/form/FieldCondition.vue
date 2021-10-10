<template>
  <div>
    <Textarea
      v-if="isTextarea()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{ ...option.props.on }"
    />
    <InputText
      v-if="isTextField()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{ ...option.props.on }"
    />
    <Select
      v-else-if="isSelect()"
      :value="value[option.props.name]"
      v-bind="option.props"
      v-on="{ ...option.props.on }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { Base } from '~/core/Base'
import { IFormOption, INPUT_TYPES } from '~/components/form/FormTypes'

@Component
export default class FieldCondition extends Base {
  @Prop(Object) readonly option!: IFormOption
  @Prop(Object) readonly value!: IFormOption

  isButtonGroup(): boolean {
    return this.option.type === INPUT_TYPES.BUTTON_GROUP
  }

  isInputButtonGroup(): boolean {
    return this.option.type === INPUT_TYPES.INPUT_BUTTON_GROUP
  }

  isTextField(): boolean {
    return this.option.type === INPUT_TYPES.TEXT
  }

  isFileField(): boolean {
    return this.option.type === INPUT_TYPES.FILE
  }

  isImageFileField(): boolean {
    return this.option.type === INPUT_TYPES.IMAGE
  }

  isAliasField(): boolean {
    return this.option.type === INPUT_TYPES.ALIAS
  }

  isPasswordField(): boolean {
    return this.option.type === INPUT_TYPES.PASSWORD
  }

  isTextarea(): boolean {
    return this.option.type === INPUT_TYPES.TEXTAREA
  }

  isSelect(): boolean {
    return this.option.type === INPUT_TYPES.SELECT
  }

  isAutoComplete(): boolean {
    return this.option.type === INPUT_TYPES.AUTOCOMPLETE
  }

  isComboBox(): boolean {
    return this.option.type === INPUT_TYPES.COMBOBOX
  }

  isCheckbox(): boolean {
    return this.option.type === INPUT_TYPES.CHECKBOOK
  }

  isRadio(): boolean {
    return this.option.type === INPUT_TYPES.RADIO
  }

  isSwitchToggle(): boolean {
    return this.option.type === INPUT_TYPES.SWITCH_TOGGLE
  }

  isDatePicker(): boolean {
    return this.option.type === INPUT_TYPES.DATEPICKER
  }

  isDateTimePicker(): boolean {
    return this.option.type === INPUT_TYPES.DATETIMEPICKER
  }

  isTimePicker(): boolean {
    return this.option.type === INPUT_TYPES.TIMEPICKER
  }

  isUploadImage(): boolean {
    return this.option.type === INPUT_TYPES.UPLOAD_IMAGE
  }

  isColorPickerS(): boolean {
    return this.option.type === INPUT_TYPES.COLOR_PICKER_S
  }

  isHTMLEditor(): boolean {
    return this.option.type === INPUT_TYPES.HTMLEDITOR
  }

  isSelection(): boolean {
    return this.option.type === INPUT_TYPES.SELECTION
  }

  isComponent(): boolean {
    return this.option.type === INPUT_TYPES.COMPONENT
  }
}
</script>

<style scoped></style>
