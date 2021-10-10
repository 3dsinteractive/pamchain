import urlJoin from 'url-join'
import { API_TYPE } from '~/constants/apiTypes'
import { CONFIG } from '~/constants/config'
import { IState } from '~/store/types'
import { TimeHelper } from '~/utils/TimeHelper'

export class Core {
  static get config() {
    return CONFIG
  }

  static PAMChainAPIOptions = (ctx: IState | any, cookies?: any): any => {
    let token = false
    if (ctx.rootState) {
      token =
        ctx.rootState?.app?.me?.token || cookies?.get('me')?.token || false
    } else {
      token = ctx.app?.me?.token || cookies?.get('me')?.token || false
    }

    return {
      apiType: API_TYPE.PAMCHAIN,
      baseURL: Core.config.PAMCHAIN_API,
      headers: {
        ...(token && { Authorization: token }),
        'x-timestamp': TimeHelper.toUTC(TimeHelper.getCurrentDateTime()),
        'x-device': 'browser'
      }
    }
  }

  static PAMChainAPI = (path: string): string => {
    return urlJoin(`${Core.config.PAMCHAIN_API}`, path)
  }
}
