import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import School from "../schools/school.model.js";

const Subject = db.define(
  "subject",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    school_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: School,
        key: "id",
      },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: true },
    category: {
      type: DataTypes.ENUM("theory", "practical", "both"),
      defaultValue: "theory",
    },
  },
  {
    tableName: "subject",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { unique: true, fields: ["school_id", "name"] },
    ],
  }
);

export default Subject;