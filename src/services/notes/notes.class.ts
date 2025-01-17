// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { SequelizeService, SequelizeAdapterParams, SequelizeAdapterOptions } from 'feathers-sequelize'
import createModel from '../../models/note.model'

import type { Application } from '../../declarations'
import type { Note, NoteData, NotePatch, NoteQuery } from './notes.schema'

export type { Note, NoteData, NotePatch, NoteQuery }

export interface NoteParams extends SequelizeAdapterParams<NoteQuery> {}

// By default calls the standard Sequelize adapter service methods but can be customized with your own functionality.
export class NoteService<ServiceParams extends Params = NoteParams> extends SequelizeService<
  Note,
  NoteData,
  NoteParams,
  NotePatch
> {}

export const getOptions = (app: Application): SequelizeAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: createModel(app)
  }
}
