import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const Class = db.define(
  "class",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    school_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "schools",
        key: "id",
      },
    },
    section_id: {
  type: DataTypes.BIGINT,
  allowNull: false,
},

    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },

    class_teacher_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "teachers",
        key: "id",
      },
    },
  },
  {
    tableName: "classes",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["school_id", "class_name"],
      },
    ],
  }
);

export default Class;
