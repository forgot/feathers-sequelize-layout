// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { SequelizeService, SequelizeAdapterParams, SequelizeAdapterOptions } from 'feathers-sequelize'
import { createModel } from '../../models/user.model'

import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './users.schema'

export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends SequelizeAdapterParams<UserQuery> {}

// By default calls the standard Sequelize adapter service methods but can be customized with your own functionality.
export class UserService<ServiceParams extends Params = UserParams> extends SequelizeService<
  User,
  UserData,
  UserParams,
  UserPatch
> {}

export const getOptions = (app: Application): SequelizeAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: createModel(app)
  }
}
