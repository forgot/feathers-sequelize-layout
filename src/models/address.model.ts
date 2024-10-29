// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import {
  Sequelize,
  DataTypes,
  ModelStatic,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ForeignKey
} from 'sequelize'
import { Application } from '../declarations'
import { User } from './user.model'

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  declare userId: ForeignKey<User['id']>
  declare address: string

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>

  declare static associate: (models: any) => void
}

export const createModel = (app: Application): ModelStatic<Address> => {

  Address.init(
    {
      address: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      tableName: 'address',
      sequelize: app.get('postgresqlClient') as Sequelize // passing the `sequelizeClient` instance is required
    }
  )

  // Address.belongsTo(User, { targetKey: 'id' })

  Address.associate = function (models: any): void {

    const { User } = models

    Address.belongsTo(User, { foreignKey: { field: 'userId' } })
  }

  return Address
}
