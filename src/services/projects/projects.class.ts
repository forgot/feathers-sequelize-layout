// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { SequelizeService, SequelizeAdapterParams, SequelizeAdapterOptions } from 'feathers-sequelize'
import { createModel } from '../../models/project.model'

import type { Application } from '../../declarations'
import type { Project, ProjectData, ProjectPatch, ProjectQuery } from './projects.schema'

export type { Project, ProjectData, ProjectPatch, ProjectQuery }

export interface ProjectParams extends SequelizeAdapterParams<ProjectQuery> {}

// By default calls the standard Sequelize adapter service methods but can be customized with your own functionality.
export class ProjectService<ServiceParams extends Params = ProjectParams> extends SequelizeService<
  Project,
  ProjectData,
  ProjectParams,
  ProjectPatch
> {}

export const getOptions = (app: Application): SequelizeAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: createModel(app)
  }
}
