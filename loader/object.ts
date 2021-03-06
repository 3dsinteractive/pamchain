import {IFetchOption, LoaderFetchData} from "~/loader/types";
import {NewRequester} from "~/core/Requester";
import {BaseLoader} from "~/loader/baseLoader";
import {CookieHelper} from "~/utils/CookieHelper";
import ObjectHelper from "~/utils/ObjectHelper";
import {getRequestObjectOptions} from "~/utils/utils";

export class ObjectLoader<T = any> extends BaseLoader<T> {
  public $fetch = async (q: string = '', options: IFetchOption = {}) => {
    this.toLoadingStatus(`${this.stateKey}_fetch`)

    try {
      const response = await NewRequester.get<any>(
        this.options(new LoaderFetchData(q, options)).baseURL,
        getRequestObjectOptions(
          this.state, this.options(
            {
              ...this.options(new LoaderFetchData(q, options)),
              params: {...this.options(new LoaderFetchData(q, options)).params, ...options.params}
            }), this._vm.cookies))
      this.toSuccessStatus(`${this.stateKey}_fetch`, response.data?.items || [], {
        ...ObjectHelper.toPageOption(response),
        limit: options?.params?.limit || 10
      })
      if (this.options(this._vm).cookieKey) {
        CookieHelper.set(this.options().cookieKey!, this.fetchItems)
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
}
