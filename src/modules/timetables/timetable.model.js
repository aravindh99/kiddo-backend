import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Class from "../classes/classes.model.js";
import Teacher from "../teachers/teacher.model.js";
import Subject from "../subjects/subject.model.js";

const Timetable = db.define(
  "timetable_slot",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    class_room_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Class, key: "id" },
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
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Subject, key: "id" },
    },

    teacher_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Teacher, key: "id" },
    },

    start_time: { type: DataTypes.TIME, allowNull: true },
    end_time: { type: DataTypes.TIME, allowNull: true },
  },
  {
    tableName: "timetable_slot",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["class_room_id", "day_of_week", "period_no"],
      },
      { fields: ["teacher_id"] },
      { fields: ["subject_id"] },
    ],
  }
);

Timetable.belongsTo(Class, { foreignKey: "class_room_id", as: "class" });
Timetable.belongsTo(Teacher, { foreignKey: "teacher_id", as: "teacher" });
Timetable.belongsTo(Subject, { foreignKey: "subject_id", as: "subject" });

export default Timetable;
