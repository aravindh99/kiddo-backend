import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const Timetable = db.define(
  "timetable_slot",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    class_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "classes", key: "id" },
    },

    day_of_week: {
      type: DataTypes.ENUM("Mon", "Tue", "Wed", "Thu", "Fri", "Sat"),
      allowNull: false,
    },

    period_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    subject_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "subjects", key: "id" },
    },

    teacher_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "teachers", key: "id" },
    },

    start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    tableName: "timetable_slots",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["class_id", "day_of_week", "period_no"],
      },
      {
        unique: true,
        fields: ["teacher_id", "day_of_week", "period_no"],
      },
      { fields: ["teacher_id"] },
      { fields: ["subject_id"] },
    ],
  }
);

export default Timetable;
