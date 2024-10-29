// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { SequelizeService, SequelizeAdapterParams, SequelizeAdapterOptions } from 'feathers-sequelize'
import { createModel } from '../../models/address.model'

import type { Application } from '../../declarations'
import type { Address, AddressData, AddressPatch, AddressQuery } from './addresses.schema'

export type { Address, AddressData, AddressPatch, AddressQuery }

export interface AddressParams extends SequelizeAdapterParams<AddressQuery> {}

// By default calls the standard Sequelize adapter service methods but can be customized with your own functionality.
export class AddressService<ServiceParams extends Params = AddressParams> extends SequelizeService<
  Address,
  AddressData,
  AddressParams,
  AddressPatch
> {}

export const getOptions = (app: Application): SequelizeAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: createModel(app)
  }
}
