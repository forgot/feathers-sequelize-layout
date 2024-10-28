// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import type { Application } from './declarations'
import { Sequelize } from 'sequelize'

declare module './declarations' {
  interface Configuration {
    postgresqlClient: Sequelize
  }
}

export const postgresql = (app: Application) => {
  const config = app.get('postgresql')
  const db = new Sequelize(config!)
  app.set('postgresqlClient', db)
}
