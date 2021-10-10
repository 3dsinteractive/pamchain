import {Context} from '@nuxt/types'
import AppRepository from '~/repositories/AppRepository'

const prefix = 'app'

export declare interface IAction {
  readonly type: string
  payload?: any
}

export interface IState {
  app: IAppState,
  route: IRouteState,
  form: any
}

export interface IPageMeta {
  feature?: string,
  title?: string,
  sub_title?: string,
  icon?: string,
  breadcrumb?: IBreadcrumbItemState[]
  is_reload?: boolean
}

export interface IDocMeta {
  title?: string,
  platform?: string,
  platformName?: string
}

export interface IDialog {
  header: string
  description: string
  confirm_button: string
  cancel_button: string
  onConfirm: any
  onCancel: any
}

export interface IDialogState extends IDialog {
  is_show: boolean
}

export interface IAppState {
  doc: IDocMeta,
  page: IPageMeta,
  dialog: IDialogState
  state: object
}

export interface IRouteState {
  name: string;
  meta: any[];
  path: string;
  hash: string;
  query: {
    [key: string]: string
  };
  params: {
    [key: string]: string
  };
  fullPath: string;
}

export interface IBreadcrumbItemState {
  name: string
  isActive?: boolean
  to?: string
}

export interface IUpdateState {
  isError?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  isLoaded?: boolean
  errorData?: any
  options?: any
  data?: any
  items?: any[]
}

export interface IReplaceState {
  isError?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  isLoaded?: boolean
  errorData?: any
  options?: any
  data?: any
  items?: any[]
}

export interface ICookie {
  set(key: string, value: string, options?: object): any

  get(key: string): any

  remove(key: string): any
}

export interface IContext extends Context {
  app: {
    $app: AppRepository
    $pageNumber: number
    query: {
      [key: string]: string
    }
    pageNumber: number
    $toast: any
  }
  params: any
  $cookies: any
  $toast: any
}

export declare interface IDispatch {
  readonly type: string;
  payload?: any;
}

export declare interface ISaveState extends IDispatch {
  key: string
}

export class UpdateRoute implements IDispatch {
  type = `${prefix}/updateRoute`

  constructor(public route: IRouteState) {
  }
}

export class UpdatePageMeta implements IDispatch {
  type = `${prefix}/updatePageMeta`

  constructor(public data: IPageMeta) {
  }
}

export class UpdateDocMeta implements IDispatch {
  type = `${prefix}/updateDocMeta`

  constructor(public data: IDocMeta) {
  }
}

export class SaveToState implements ISaveState {
  type = `${prefix}/updateState`

  constructor(public key: string, public data: IUpdateState) {
  }
}

export class ReplaceState implements ISaveState {
  type = `${prefix}/replaceState`

  constructor(public key: string, public data: IReplaceState, public isRoot: boolean = false) {
  }
}

export class SaveToAppState implements ISaveState {
  type = `${prefix}/updateAppState`

  constructor(public key: string, public data: IUpdateState) {
  }
}

export class ReplaceAppState implements ISaveState {
  type = `${prefix}/replaceAppState`

  constructor(public key: string, public data: IReplaceState, public isRoot: boolean = false) {
  }
}

export class DestroyAppState implements ISaveState {
  type = `${prefix}/destroyAppState`

  constructor(public key: string) {
  }
}