import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Section = db.define(
  "section",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    class_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "sections",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["class_id", "name"],
      },
    ],
  }
);

export default Section;
