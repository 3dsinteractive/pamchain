import { BaseRepository } from '~/repositories/BaseRepository'
import { FormTypes } from '~/store/form'
import { _isEqual } from '~/utils/lodash'

export default class FormRepository extends BaseRepository {
  public get form(): Object {
    return this.state.form.data
  }

  public get = <T>(formName: string): T => {
    return this.getters['form/getByName'](formName)
  }

  public reset = (formName: string): void => {
    return this.commit(new FormTypes.RemoveForm(formName))
  }

  public getAttr = <T>(formName: string, attrName: string): T => {
    return this.getters['form/getFormValue'](formName, attrName)
  }

  public updateAttr = <T>(
    formName: string,
    attrName: string,
    value: T
  ): void => {
    if (!_isEqual(this.getAttr(formName, attrName), value)) {
      return this.commit(new FormTypes.UpdateValue(formName, attrName, value))
    }
  }

  public init = <T>(formName: string, value: T): void => {
    return this.commit(new FormTypes.InitForm(formName, value))
  }
}
