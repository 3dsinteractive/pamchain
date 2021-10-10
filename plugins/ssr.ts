import AppRepository from '~/repositories/AppRepository'

export default (ctx: any, inject: any) => {
  inject('app', new AppRepository(ctx))
}
