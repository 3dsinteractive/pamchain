import { IContractLoaderOption } from '~/loader/types'
import {
  IContext,
  IState,
  ReplaceAppState,
  SaveToAppState,
} from '~/store/types'
import { _get } from '~/utils/lodash'
import { commonObjectState } from '~/state/object'
import { commonListState } from '~/state/page'
import ObjectHelper from '~/utils/ObjectHelper'
import { v4 as uuidV4 } from 'uuid'

interface IInitial {
  isInitState: boolean
}

export class ContractLoader<T = any> {
  protected stateKey!: string

  constructor(
    protected _vm: IContext | any,
    public options: (data?: any) => IContractLoaderOption,
  ) {}

  public $fetch = async () => {
    this.toLoadingStatus(`${this.stateKey}_fetch`)

    try {
      const response = await this.options().handle()
      if (response) {
        // only keep response in vuex if response is defined
        if (Array.isArray(response)) {
          this.toSuccessItemsStatus(`${this.stateKey}_fetch`, response)
        } else {
          this.toSuccessItemsStatus(`${this.stateKey}_fetch`, [response])
        }
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
      new ReplaceAppState(`${this.stateKey}_fetch`, commonListState()),
    )
  }

  protected toLoadingStatus(key: string) {
    this.commit(
      new SaveToAppState(key, {
        isLoading: true,
        isLoaded: false,
        isError: false,
        isSuccess: false,
        errorData: null,
      }),
    )
  }

  protected toSuccessStatus(key: string, data: any, options: any = {}) {
    this.commit(
      new SaveToAppState(key, {
        isSuccess: true,
        data: data,
        options: options,
      }),
    )
  }

  protected toSuccessItemsStatus(key: string, items: any[], options: any = {}) {
    this.commit(
      new SaveToAppState(key, {
        isSuccess: true,
        items: items,
        options: options,
      }),
    )
  }

  protected toErrorStatus(key: string, error: any) {
    this.commit(
      new SaveToAppState(key, {
        isError: true,
        errorData: error,
      }),
    )
  }

  protected toCompleteStatus(key: string) {
    this.commit(
      new SaveToAppState(key, {
        isLoading: false,
        isLoaded: true,
      }),
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
      this.getStateWithPostfix(`${this.stateKey}_fetch`),
    )
  }
}
