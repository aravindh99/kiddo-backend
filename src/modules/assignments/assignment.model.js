import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const Assignment = db.define(
  "assignment",
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
    class_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "classes",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("DRAFT", "PUBLISHED", "CLOSED"),
      defaultValue: "DRAFT",
      allowNull: false,
    },

    teacher_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "teachers",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "assignments",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { fields: ["class_id"] },
      { fields: ["teacher_id"] },
      { fields: ["due_date"] }
    ]
  }
);
export default Assignment;