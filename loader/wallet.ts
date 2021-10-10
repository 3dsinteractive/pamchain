import { v4 as uuidV4 } from 'uuid'
import { IWalletLoaderOption } from '~/loader/types'
import {
  IContext,
  IState,
  ReplaceAppState,
  SaveToAppState
} from '~/store/types'
import { _get } from '~/utils/lodash'
import { commonListState } from '~/state/page'
import ObjectHelper from '~/utils/ObjectHelper'

interface IInitial {
  isInitState: boolean
}

export class WalletLoader<T = any> {
  protected stateKey!: string
  public options: (data?: any) => IWalletLoaderOption
  protected _vm: IContext | any

  constructor(
    _vm: IContext | any,
    options: (data?: any) => IWalletLoaderOption
  ) {
    this.options = options
    this._vm = _vm
  }

  public $fetch = async (opts: any = { reconnect: false }) => {
    this.toLoadingStatus(`${this.stateKey}_fetch`)

    try {
      let state: any = null
      if (opts && opts.reconnect) {
        state = await this._vm.$eth.reconnect()
      } else {
        state = await this._vm.$eth.connect()
      }

      if (state.isConnected) {
        this.toSuccessItemsStatus(
          `${this.stateKey}_fetch`,
          this._vm.$eth.accounts
        )
      }

      if (this.options().onFetchSuccess) {
        this.options().onFetchSuccess!(this.fetchStatus)
      }
    } catch (e: any) {
      this.toErrorStatus(`${this.stateKey}_fetch`, e.response?.data || e)
      if (this.options().onFetchError) {
        this.options().onFetchError!(this.fetchStatus)
      }
    }

    this.toCompleteStatus(`${this.stateKey}_fetch`)
  }

  public initial(options: IInitial = { isInitState: false }) {
    this.stateKey = this.options()?.stateKey ?? uuidV4()

    if (options.isInitState) {
      this.initialState()
    }
  }

  private initialState() {
    this.commit(
      new ReplaceAppState(`${this.stateKey}_fetch`, commonListState())
    )
  }

  protected toLoadingStatus(key: string) {
    this.commit(
      new SaveToAppState(key, {
        isLoading: true,
        isLoaded: false,
        isError: false,
        isSuccess: false,
        errorData: null
      })
    )
  }

  protected toSuccessStatus(key: string, data: any, options: any = {}) {
    this.commit(
      new SaveToAppState(key, {
        isSuccess: true,
        data,
        options
      })
    )
  }

  protected toSuccessItemsStatus(key: string, items: any[], options: any = {}) {
    this.commit(
      new SaveToAppState(key, {
        isSuccess: true,
        items,
        options
      })
    )
  }

  protected toErrorStatus(key: string, error: any) {
    this.commit(
      new SaveToAppState(key, {
        isError: true,
        errorData: error
      })
    )
  }

  protected toCompleteStatus(key: string) {
    this.commit(
      new SaveToAppState(key, {
        isLoading: false,
        isLoaded: true
      })
    )
  }

  private getStateWithPostfix(key: string): any {
    return this.getters['app/getState'](key)
  }

  get store() {
    return (this._vm as any).store || this._vm.$store
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

  get fetchItems(): T[] {
    return (
      this.options().mockFetchItems ??
      _get(this.getStateWithPostfix(`${this.stateKey}_fetch`), 'items', [])
    )
  }

  get fetchStatus() {
    return ObjectHelper.toStatus(
      this.getStateWithPostfix(`${this.stateKey}_fetch`)
    )
  }
}
