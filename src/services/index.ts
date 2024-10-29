import { note } from './notes/notes'
import { address } from './addresses/addresses'
import { project } from './projects/projects'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(note)
  app.configure(address)
  app.configure(project)
  app.configure(user)
  // All services will be registered here
}
