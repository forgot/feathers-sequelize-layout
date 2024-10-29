// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AddressService } from './addresses.class'

// Main data model schema
export const addressSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Address', additionalProperties: false }
)
export type Address = Static<typeof addressSchema>
export const addressValidator = getValidator(addressSchema, dataValidator)
export const addressResolver = resolve<Address, HookContext<AddressService>>({})

export const addressExternalResolver = resolve<Address, HookContext<AddressService>>({})

// Schema for creating new entries
export const addressDataSchema = Type.Pick(addressSchema, ['text'], {
  $id: 'AddressData'
})
export type AddressData = Static<typeof addressDataSchema>
export const addressDataValidator = getValidator(addressDataSchema, dataValidator)
export const addressDataResolver = resolve<Address, HookContext<AddressService>>({})

// Schema for updating existing entries
export const addressPatchSchema = Type.Partial(addressSchema, {
  $id: 'AddressPatch'
})
export type AddressPatch = Static<typeof addressPatchSchema>
export const addressPatchValidator = getValidator(addressPatchSchema, dataValidator)
export const addressPatchResolver = resolve<Address, HookContext<AddressService>>({})

// Schema for allowed query properties
export const addressQueryProperties = Type.Pick(addressSchema, ['id', 'text'])
export const addressQuerySchema = Type.Intersect(
  [
    querySyntax(addressQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AddressQuery = Static<typeof addressQuerySchema>
export const addressQueryValidator = getValidator(addressQuerySchema, queryValidator)
export const addressQueryResolver = resolve<AddressQuery, HookContext<AddressService>>({})
