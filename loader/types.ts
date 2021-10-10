import {IStatus} from "~/state/types";

export interface IParam {
  limit?: number

  [key: string]: any
}

export interface IFetchOption {
  params?: IParam
  options?: object
}

export interface IFindOption {
  params?: IParam
}

export interface ILoaderOption {
  apiType?: string
  params?: IParam
  headers?: object
  callback?: object

  baseURL: string
  baseAdd?: string
  baseFind?: string
  baseUpdate?: string
  baseDelete?: string

  transformFetch?: (data: any[]) => any[]
  transformGet?: (data: any) => any

  stateKey?: string
  appendKey?: string
  cookieKey?: string

  mockFindItem?: any
  mockFetchItems?: any[]

  onAddSuccess?: (newValue: IStatus) => void
  onAddError?: (newValue: IStatus) => void
  onFetchSuccess?: (newValue: IStatus) => void
  onFetchError?: (newValue: IStatus) => void
  onFindSuccess?: (newValue: IStatus) => void
  onFindError?: (newValue: IStatus) => void
  onUpdateSuccess?: (newValue: IStatus) => void
  onUpdateError?: (newValue: IStatus) => void
  onDeleteSuccess?: (newValue: IStatus) => void
  onDeleteError?: (newValue: IStatus) => void
}

export interface IContractLoaderOption {
  handle: () => Promise<any>
  stateKey?: string
  mockFetchItems?: any[]
  onFetchSuccess?: (newValue: IStatus) => void
  onFetchError?: (newValue: IStatus) => void
}

export interface IWalletLoaderOption {
  stateKey?: string
  mockFetchItems?: any[]
  onFetchSuccess?: (newValue: IStatus) => void
  onFetchError?: (newValue: IStatus) => void
}

declare class IParamData {
  public params: object
}

export declare class IAddData {
  public options: IParam
}

export declare class IFetchData extends IParamData {
  public q: string
  public options: IFetchOption
}

export declare class IFetchInfiniteData extends IParamData {
  public page: string
  public q: string
  public options: IFetchOption
}

export declare class IFindData extends IParamData {
  public id: string
  public options: IFindOption
}

export declare class IUpdateData {
  public id: string
  public options: IParam
}

export declare class IDeleteData {
  public id: string
}

export class LoaderAddData implements IAddData {
  constructor(public options: IParam = {}) {
  }
}

export class LoaderFetchData implements IFetchData {
  public params: object = {}
  public opts: object = {}

  constructor(public q: string = '', public options: IFetchOption = {}) {
    this.params = {
      q,
      ...options.params
    }
    this.opts = {
      ...options.options,
    }
  }
}

export class LoaderFetchInfiniteData implements IFetchInfiniteData {
  public params: object = {}

  constructor(public page: string = '', public q: string = '', public options: IFetchOption = {}) {
    this.params = {
      page,
      q,
      ...options.params
    }
  }
}

export class LoaderFindData implements IFindData {
  public params: object = {}

  constructor(public id: string, public options: IFindOption = {}) {
    this.params = {
      ...options.params
    }
  }
}

export class LoaderUpdateData implements IUpdateData {
  constructor(public id: string, public options: IParam = {}) {
  }
}

export class LoaderDeleteData implements IDeleteData {
  constructor(public id: string) {
    this.id = id
  }
}

export declare type LoaderData =
  LoaderAddData
  | LoaderFetchData
  | LoaderFetchInfiniteData
  | LoaderFindData
  | LoaderUpdateData
  | LoaderDeleteData
