import {BaseRepository} from '~/repositories/BaseRepository'
import {
  IBreadcrumbItemState,
  IDocMeta,
  IPageMeta, 
  IReplaceState,
  IUpdateState, 
  ReplaceState,
  SaveToState, 
  UpdateDocMeta,
  UpdatePageMeta, 
  UpdateRoute
} from '~/store/types'
import * as queryString from 'query-string'
import {_get} from "~/utils/lodash";

export default class AppRepository extends BaseRepository {

  public get pageNumber(): number {
    if (process.browser) {
      const parsed = queryString.parse(window.location.search)
      return +(parsed?.page || 1)
    } else {
      return +(this.state.route.query?.page || 1)
    }
  }

  public get query(): any {
    if (process.browser) {
      return queryString.parse(window.location.search)
    } else {
      return this.state.route.query
    }
  }

  public get pageMeta(): IPageMeta {
    return this.getStateByKey('page')
  }

  public get docMeta(): IDocMeta {
    return this.getStateByKey('doc')
  }

  public get breadcrumb(): IBreadcrumbItemState[] {
    return this.getStateByKey('breadcrumb')
  }

  public updateRoute = (route: any): void => {
    this.commit(new UpdateRoute(route))
  }

  public updatePageMeta = (data: IPageMeta): void => {
    this.commit(new UpdatePageMeta(data))
  }

  public updateDocMeta = (data: IDocMeta): void => {
    this.commit(new UpdateDocMeta(data))
  }

  public replaceState = (key: string, data: IReplaceState): void => {
    this.commit(new ReplaceState(key, data))
  }

  public saveToState = (key: string, data: IUpdateState | any): void => {
    this.commit(new SaveToState(key, data))
  }
}
