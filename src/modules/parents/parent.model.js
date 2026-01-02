import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const Parent = db.define(
  "parent",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "students",
        key: "id",
      },
    },
    relation_type: {
      type: DataTypes.ENUM("mother", "father", "guardian"),
      allowNull: false,
    },
  },
  {
    tableName: "parents",
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["student_id"] },
      {
        unique: true,
        fields: ["student_id", "user_id"],
      },
    ],
  }
);

export default Parent;