import {IFetchOption, LoaderFetchInfiniteData} from "~/loader/types";
import {NewRequester} from "~/core/Requester";
import {BaseLoader} from "~/loader/baseLoader";
import {CookieHelper} from "~/utils/CookieHelper";
import ObjectHelper from "~/utils/ObjectHelper";
import {getRequestObjectOptions} from "~/utils/utils";
import {Core} from "~/core/Core";

export class PageInfiniteLoader extends BaseLoader {
  public $fetch = async (afterID: string, q: string = '', options: IFetchOption = {}) => {
    this.toLoadingStatus(`${this.stateKey}_fetch`)

    try {
      const response = await NewRequester.get<any>(
        this.options(new LoaderFetchInfiniteData(afterID, q, options)).baseURL,
        getRequestObjectOptions(
          this.state,
          {
            ...this.options(new LoaderFetchInfiniteData(afterID, q, options)),
            params: {...this.options(new LoaderFetchInfiniteData(afterID, q, options)).params, ...options.params}
          }, this._vm.cookies))

      let pageOptions = ObjectHelper.toPageOption(response)
      if (this.options(new LoaderFetchInfiniteData(afterID, q, options)).apiType === 'MKTCMS' || this.options(new LoaderFetchInfiniteData(afterID, q, options)).apiType === 'MKTCONNECT') {
        pageOptions = ObjectHelper.toPageOptionMKT(response)
      }
      this.toSuccessItemsStatus(`${this.stateKey}_fetch`, [
        ...this.fetchItems,
        ...(response.data?.items || [])],
        {...pageOptions, limit: options?.params?.limit || Core.config.LIMIT_PER_PAGE}
      )
      if (this.options(this._vm).cookieKey) {
        CookieHelper.set(this.options().cookieKey!, this.fetchItems)
      }
      if (this.options().onFetchSuccess) {
        this.options().onFetchSuccess!(this.fetchStatus)
      }
    } catch (e: any) {
      this.toErrorStatus(`${this.stateKey}_fetch`, e.response?.data || e)
      if(this.options().onFetchError){
        this.options().onFetchError!(this.fetchStatus)
      }
    }

    this.toCompleteStatus(`${this.stateKey}_fetch`)
  }
}
