import {IPageOption, IStatus} from '~/state/types';
import {IResponse} from '~/core/Requester';

export default class ObjectHelper {
  static toStatus = (obj: IStatus): IStatus => ({
    isError: obj.isError,
    isSuccess: obj.isSuccess,
    isLoading: obj.isLoading,
    isLoaded: obj.isLoaded,
    errorData: obj.errorData,
  })

  static toLoadingStatus = (obj: any) => ({
    ...obj,
    isLoading: true,
    isLoaded: false,
    isSuccess: false,
    isError: false
  })

  static toObjSuccessStatus = (obj: any, data: any, options: object = {}) => ({
    ...obj,
    data,
    isLoading: false,
    isLoaded: true,
    isSuccess: true,
    isError: false,
    ...options,
  })

  static toItemsLoadingStatus = (obj: any) => ({
    ...obj,
    items: [],
    isLoading: true,
    isLoaded: false,
    isSuccess: false,
    isError: false
  })

  static toItemsSuccessStatus = (obj: any, items: any[], options?: IPageOption) => ({
    ...obj,
    items,
    isLoading: false,
    isLoaded: true,
    isSuccess: true,
    options: {
      ...options
    }
  })

  static toErrorStatus = (obj: any, e: any) => ({
    ...obj,
    isLoading: false,
    isLoaded: true,
    isError: true,
    isSuccess: false,
    errorData: e
  })

  static toCompleteStatus = (obj: any): any => ({
    ...obj,
    isLoading: false,
    // isLoaded: false,
  })

  static toPageOption = (response: IResponse): any => ({
    currentPage: response?.data?.current || 1,
    nextPage: response?.data?.next || 1,
    prevPage: response?.data?.prev || 1,
    totalItem: response?.data?.total || 0,
  })

  static toPageOptionMKT = (response: IResponse): any => ({
    currentPage: response?.data?.current_page || 1,
    nextPage: response?.data?.current_page + 1 || 1,
    prevPage: response?.data?.current_page - 1 > 1 ? response?.data?.current_page - 1 : 1,
    totalItem: response?.data?.total_rows || 0,
  })

  static getLength = (obj: any): number => {
    if (!obj) {
      return 0
    }

    let count = 0
    for (const [,] of Object.entries(obj)) {
      count++
    }

    return count
  }

  static filter = (obj: any, handler: (o: any) => boolean): any => {
    if (!obj) {
      return null
    }

    let newObj: any = {}
    for (const [key, value] of Object.entries(obj)) {
      if (handler(value)) {
        newObj = {
          ...newObj,
          [key]: value
        }
      }
    }

    return newObj
  }
}
