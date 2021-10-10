import {
  IAppState, 
  IReplaceState, 
  IUpdateState, 
  UpdateDocMeta, 
  UpdatePageMeta, 
  UpdateRoute
} from '~/store/types'
import {Core} from '~/core/Core'
import Vue from "vue";

export const state = () => ({
  me: {},
  page: {
    title: '',
    sub_title: '',
    breadcrumb: []
  },
  doc: {
    title: Core.config.TITLE,
    platformName: ''
  },
  sidebar: [],
  theme: null,
  dialog: {
    header: '',
    description: '',
    confirm_button: 'Ok',
    cancel_button: 'Cancel',
    onConfirm: null,
    onCancel: null,
    is_show: false,
  },
  state: {}
})

export const mutations = {
  updateRoute: (state: IAppState, {route}: UpdateRoute) => {
  },
  updatePageMeta: (state: IAppState, {data}: UpdatePageMeta) => {
    if (data.breadcrumb) {
      if (data.breadcrumb.length > 0) {
        data.breadcrumb[data.breadcrumb.length - 1].isActive = true
      }
    }
    state.page = {
      ...state.page,
      ...data
    }
  },
  updateDocMeta: (state: IAppState, {data}: UpdateDocMeta) => {
    if (data.title) {
      data.title = `${data.title} - ${state.doc.platformName} | ${Core.config.TITLE}`
    }
    state.doc = {
      ...state.doc,
      ...data
    }
  },
  updateState: (state: any, data: { data: IUpdateState, key: string }) => {
    Vue.set(state, data.key, {
      ...state[data.key],
      ...data.data
    })
  },
  replaceState: (state: any, data: { data: IReplaceState | any, key: string, isRoot: boolean }) => {
    Vue.set(state, data.key, data.data)
  },
  updateAppState: (state: any, data: { data: IUpdateState, key: string }) => {
    Vue.set(state.state, data.key, {
      ...state.state[data.key],
      ...data.data
    })
  },
  replaceAppState: (state: IAppState, data: { data: IReplaceState | any, key: string }) => {
    Vue.set(state.state, data.key, data.data)
  },
  destroyAppState: (state: IAppState, data: { key: string }) => {
    Vue.delete(state.state, `${data.key}_add`)
    Vue.delete(state.state, `${data.key}_update`)
    Vue.delete(state.state, `${data.key}_delete`)
    Vue.delete(state.state, `${data.key}_find`)
    Vue.delete(state.state, `${data.key}_fetch`)
  }
}

export const getters = {
  getState: (state: any) => (key: string) => {
    return {...state.state[key] || {}}
  }
}
