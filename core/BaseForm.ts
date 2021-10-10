import { Component, Prop, Provide } from 'vue-property-decorator'
import SweetAlertOptions from 'vue-sweetalert2'
import { BaseApp } from '~/core/Base'
import FormRepository from '~/repositories/FormRepository'
import { FormIncompleted } from '~/constants/alertMsg'

@Component
export class BaseForm<T> extends BaseApp {
  @Provide('form_name') form_name = 'default'
  @Provide('destroyOnUnmount') destroyOnUnmount = true
  @Provide('destroyOnMount') destroyOnMount = true
  @Prop(Boolean) readonly isEdit!: boolean
  form_lang = 'en'

  get formRepo(): FormRepository {
    return new FormRepository(this)
  }

  created() {
    if (this.destroyOnMount) {
      this.formRepo.reset(this.form_name)
    }
  }

  destroyed() {
    if (this.destroyOnUnmount) {
      this.formRepo.reset(this.form_name)
    }
  }

  get form(): T {
    return this.formRepo.get(this.form_name)
  }

  emitSubmit(data: any) {
    this.$emit('submit', data)
  }

  public validate(submitFunc: Function, transformFunc?: Function) {
    return new Promise<boolean>(async (resolve, reject) => {
      const isValid = await (this.$refs.form as any).validate()
      if (isValid) {
        if (transformFunc) {
          submitFunc(transformFunc(this.formRepo.get(this.form_name)))
          return resolve(true)
        } else {
          submitFunc(this.formRepo.get(this.form_name))
          return resolve(true)
        }
      } else {
        this.$swal(FormIncompleted() as SweetAlertOptions).then(() => {
          const el = document.getElementsByClassName('error--text').item(0)
          el?.scrollIntoView(false)
        })
      }

      return resolve(false)
    })
  }
}
