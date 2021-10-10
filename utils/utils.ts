import { AxiosRequestConfig } from 'axios'
import { IState } from '~/store/types'
import { ILoaderOption } from '~/loader/types'
import { Core } from '~/core/Core'
import { _omitBy } from '~/utils/lodash'
import { API_TYPE } from '~/constants/apiTypes'
import { CONFIG } from '~/constants/config'

export const isChangeWithTrue = (
  value: boolean,
  oldValue: boolean
): boolean => {
  return oldValue !== value && value
}

export const isChangeWithFalse = (
  value: boolean,
  oldValue: boolean
): boolean => {
  return oldValue !== value && !value
}

export const getRequestObjectOptions = (
  ctx: IState | any,
  options: ILoaderOption,
  $cookies: any = null
): AxiosRequestConfig => {
  const apiType = options.apiType
  let token = ''

  if (apiType === API_TYPE.PAMCHAIN) {
    token =
      Core.PAMChainAPIOptions(ctx)?.headers?.token ||
      $cookies?.get('me')?.token ||
      ''
    return {
      ...Core.PAMChainAPIOptions(ctx),
      params: {
        limit: CONFIG.LIMIT_PER_PAGE,
        ...(options.params && _omitBy(options.params))
      },
      headers: {
        ...Core.PAMChainAPIOptions(ctx).headers,
        ...(options.headers && options.headers),
        ...(token && { Authorization: token })
      },
      ...options.callback
    }
  }

  // Default return
  token =
    Core.PAMChainAPIOptions(ctx)?.headers?.token ||
    $cookies?.get('me')?.token ||
    ''
  return {
    ...Core.PAMChainAPIOptions(ctx),
    params: {
      limit: CONFIG.LIMIT_PER_PAGE,
      ...(options.params && _omitBy(options.params))
    },
    headers: {
      ...Core.PAMChainAPIOptions(ctx).headers,
      ...(options.headers && options.headers),
      ...(token && { Authorization: token })
    },
    ...options.callback
  }
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getAliasFromText = (str: string): string => {
  if (str) {
    const regexpSpacialLetter: RegExp =
      /[\_|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]+/g
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(/[ก-๙]/g, '')
      .replace(regexpSpacialLetter, '')
  }
  return ''
}

export const keyvalue = (
  data: any,
  label?: any,
  value?: any,
  subLabel?: any
) => {
  let lab = label ? data[label] : data
  const val = value ? data[value] : data
  const sub = subLabel ? data[subLabel] : ''

  if (sub && sub.length > 0) {
    lab = `${lab} (${sub})`
  }
  return {
    label: lab || '',
    value: val || ''
  }
}

export const toPercent = (
  total: number | undefined,
  current: number | undefined
): number => {
  if (!total || !current) {
    return 0
  }
  return (current / total) * 100
}

export const genString = (length: number = 5) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
