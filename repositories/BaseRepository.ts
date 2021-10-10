import {Base} from '~/core/Base'
import {IContext, ICookie, IRouteState, IState} from '~/store/types'
import {_get} from "~/utils/lodash";

export class BaseRepository {
  protected _vm: any

  constructor(_vm: Base | IContext | any) {
    this._vm = _vm
  }

  get route(): IRouteState {
    return (this._vm as any)?.route || this._vm?.$route
  }

  get router() {
    return (this._vm as any)?.app?.router || this._vm?.$router
  }

  get cookies(): ICookie {
    return (this._vm as any)?.cookie || this._vm?.$cookies
  }

  get store() {
    return (this._vm as any)?.store || this._vm?.$store
  }

  get state(): IState {
    return this.store.state
  }

  get dispatch(): any {
    return this.store.dispatch
  }

  get getters(): any {
    return this.store.getters
  }

  get commit(): any {
    return this.store.commit
  }

  public getStateByKey = <T>(key: string, isRoot: boolean = false): T => {
    return _get(this.state, isRoot ? key : `app.${key}`, null)
  }
}
