// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, ModelStatic, CreationOptional, InferAttributes, InferCreationAttributes, Model, NonAttribute, ForeignKey } from 'sequelize'
import { Application } from '../declarations'
import { User } from './user.model'


export class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>

  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
  // display an error if ownerId is missing.
  declare ownerId: ForeignKey<User['id']>
  declare name: string

  // `owner` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare owner?: NonAttribute<User>

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>

  declare static associate: (models: any) => void
}

export const createModel = (app: Application): ModelStatic<Project> => {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      tableName: 'projects',
      sequelize: app.get('postgresqlClient') as Sequelize // passing the `sequelizeClient` instance is required
    }
  )

  Project.associate = function (models: any): void {
    const { User } = models

    Project.belongsTo(User, {
      foreignKey: 'ownerId',
      as: 'owner' // this determines the name in `associations`!
    })
  }

  return Project
}


