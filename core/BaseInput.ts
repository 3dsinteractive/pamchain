import { Component, Inject, Prop, Watch } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'
import FormRepository from '~/repositories/FormRepository'
import { _isEqual, _isUndefined } from '~/utils/lodash'
import RuleHelper from '~/utils/RuleHelper'
import { EAllowDateType, IOption } from '~/components/form/FormTypes'

export interface EventInput {
  target: HTMLInputElement
}

@Component
export default class BaseInput extends BaseApp {
  @Inject('form_name') readonly form_name!: string

  innerValue: any = null

  @Prop() readonly value!: any
  @Prop() readonly defaultValue!: any

  @Prop(String) readonly className!: string
  @Prop(String) readonly label!: string
  @Prop(String) readonly name!: string
  @Prop(Array) readonly rules!: any[]
  @Prop(String) readonly placeholder!: string
  @Prop(Number) readonly height!: number
  @Prop(Array) readonly options!: IOption[]
  @Prop(String) readonly icon!: string
  @Prop(String) readonly accept!: string // upload image
  @Prop(Boolean) readonly disabled!: boolean
  @Prop(Boolean) readonly multiple!: boolean
  @Prop(String) readonly prefix!: string
  @Prop(String) readonly suffix!: string
  @Prop(Boolean) readonly range!: boolean // date picker
  @Prop(String) readonly allowDate!:
    | EAllowDateType.ALL
    | EAllowDateType.CURRENT
    | string // date picker (string format. YYYY-MM-DD)

  @Prop(Object) readonly direction!: { row?: boolean; column?: boolean } // radio
  @Prop(Function) readonly transform?: (value: any, oldValue: any) => any
  @Prop({ default: false }) readonly isHideDetail!: boolean
  @Prop(String) readonly permissionKey!: string

  created() {
    this.init()
  }

  init() {
    const value = this.value
    if (!_isUndefined(value) && _isUndefined(this.defaultValue)) {
      this.innerValue = value
    } else {
      this.innerValue = this.defaultValue || null
    }
  }

  get formRepo(): FormRepository {
    return new FormRepository(this)
  }

  onInput(value: any) {
    this.$emit('change', value)
    this.innerValue = this.transform
      ? this.transform(value, this.innerValue)
      : value || null
  }

  get isRequired(): boolean {
    return !!this.$array
      .toArray(this.rules)
      .find((r) => r === RuleHelper.required)
  }

  @Watch('innerValue', { deep: true })
  onChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      const newRawValue = _isUndefined(value) ? null : value
      this.formRepo.updateAttr(this.form_name, this.name, newRawValue)
      this.$emit('input', newRawValue)
    }
  }

  @Watch('value', { deep: true })
  onValueChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = value
    }
  }

  @Watch('defaultValue', { deep: true })
  onDefaultValueChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = this.defaultValue
    }
  }
}
