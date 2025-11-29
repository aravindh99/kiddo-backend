import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import User from "../users/user.model.js";
import School from "../schools/school.model.js";
import Class from "../classes/classes.model.js";
import Attendance from "../attendance/attenadance.model.js";
import Assignment from "../assignments/assignment.model.js";
import Timetable from "../timetables/timetable.model.js";

const Teacher = db.define(
  "teacher",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: User, key: "id" },
    },

    school_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: School, key: "id" },
    },

    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },

    designation: { type: DataTypes.STRING, allowNull: true },
    qualification: { type: DataTypes.STRING, allowNull: true },

    joining_date: { type: DataTypes.DATEONLY, allowNull: false },

    experience: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "teacher",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { fields: ["employee_id"] },
      { fields: ["user_id"] },
    ],
  }
);

// associations
Teacher.belongsTo(User, { foreignKey: "user_id", as: "user" });
Teacher.belongsTo(School, { foreignKey: "school_id", as: "school" });

export default Teacher;

// hasMany associations
Teacher.hasMany(Class, { foreignKey: "class_teacher_id", as: "taughtClasses" });
Teacher.hasMany(Attendance, { foreignKey: "marked_by", as: "markedAttendances" });
Teacher.hasMany(Assignment, { foreignKey: "teacher_id", as: "assignments" });
Teacher.hasMany(Timetable, { foreignKey: "teacher_id", as: "timetableSlots" });
