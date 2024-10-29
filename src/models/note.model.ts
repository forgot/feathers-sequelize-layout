// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import {
  DataTypes,
  ModelStatic,
  Model,
  Optional,
  ModelDefined
} from 'sequelize'
import { Application } from '../declarations'

// You can also define modules in a functional way
interface NoteAttributes {
  id: number
  title: string
  content: string
}

// You can also set multiple attributes optional at once
type NoteCreationAttributes = Optional<NoteAttributes, 'id' | 'title'>

type Note = Model<NoteAttributes, NoteCreationAttributes> 

// And with a functional approach defining a module looks like this
export default function (app: Application): ModelStatic<Note> {
  const sequelize = app.get('postgresqlClient')
    
  const Note: ModelDefined<NoteAttributes, NoteCreationAttributes> = sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: new DataTypes.STRING(64),
      defaultValue: 'Unnamed Note'
    },
    content: {
      type: new DataTypes.STRING(4096),
      allowNull: false
    }
    },
    {
        tableName: 'notes'
    }
  )

  return Note
}