import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const Attendance = db.define(
  "attendance",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    student_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "students",
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

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("present", "absent", "leave"),
      allowNull: false,
    },

    marked_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "teachers",
        key: "id",
      },
    },
  },
  {
    tableName: "attendances",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["student_id", "class_id", "date"],
      },
      { fields: ["class_id"] },
      { fields: ["marked_by"] },
      { fields: ["date"] },
    ],
  }
);

export default Attendance;
