// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import {
  Sequelize,
  DataTypes,
  ModelStatic,
  Association,
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize'
import { Application } from '../declarations'
import { Project } from './project.model'
import { Address } from './address.model'

// 'projects' is excluded as it's not an attribute, it's an association.
export class User extends Model<
  InferAttributes<User, { omit: 'projects' }>,
  InferCreationAttributes<User, { omit: 'projects' }>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>
  declare name: string
  declare preferredName: string | null // for nullable fields
  declare email: string
  declare password: string

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProjects: HasManyGetAssociationsMixin<Project> // Note the null assertions!
  declare addProject: HasManyAddAssociationMixin<Project, number>
  declare addProjects: HasManyAddAssociationsMixin<Project, number>
  declare setProjects: HasManySetAssociationsMixin<Project, number>
  declare removeProject: HasManyRemoveAssociationMixin<Project, number>
  declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>
  declare hasProject: HasManyHasAssociationMixin<Project, number>
  declare hasProjects: HasManyHasAssociationsMixin<Project, number>
  declare countProjects: HasManyCountAssociationsMixin
  declare createProject: HasManyCreateAssociationMixin<Project, 'ownerId'>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare projects?: NonAttribute<Project[]> // Note this is optional since it's only populated when explicitly requested in code

  // getters that are not attributes should be tagged using NonAttribute
  // to remove them from the model's Attribute Typings.
  get fullName(): NonAttribute<string> {
    return this.name
  }

  declare static associations: {
    projects: Association<User, Project>
    address: Association<User, Address>
  }

  declare static associate: (models: any) => void
}


export const createModel = (app: Application): ModelStatic<User> => {
  User.init(
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
      preferredName: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      tableName: 'users',
      sequelize: app.get('postgresqlClient') // passing the `sequelizeClient` instance is required
    }
  )

  // Here we associate which actually populates out pre-declared `association` static and other methods.
  User.associate = function (models: any): void {
    const { Project, Address } = models

    User.hasMany(Project, {
      sourceKey: 'id',
      foreignKey: 'ownerId',
      as: 'projects' // this determines the name in `associations`!
    })

    User.hasOne(Address, { foreignKey: { field: 'userId' } })
  }

  return User
}
