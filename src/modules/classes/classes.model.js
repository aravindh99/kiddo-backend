import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import School from "../schools/school.model.js";
import Teachers from "../teachers/teacher.model.js";
import Student from "../students/student.model.js";
import Attendance from "../attendance/attenadance.model.js";
import Assignment from "../assignments/assignment.model.js";
import ReportCard from "../report-cards/report-card.model.js";
import Timetable from "../timetables/timetable.model.js";

const Class = db.define(
  "class",
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
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    section_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    class_teacher_id: {
      type: DataTypes.UUID,
      references: {
        model: Teachers,
        key: "id",
      },
    },
  },
  {
    tableName: "class",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["school_id", "class_name", "section_name"],
      },
    ],
  }
);
Class.belongsTo(School, {
  foreignKey: "school_id",
  targetKey: "id",
  as: "school",
});
Class.belongsTo(Teachers, {
  foreignKey: "class_teacher_id",
  targetKey: "id",
  as: "class_teacher",
});

export default Class;

// hasMany associations
Class.hasMany(Student, { foreignKey: "class_id", as: "students" });
Class.hasMany(Attendance, { foreignKey: "class_id", as: "attendances" });
Class.hasMany(Assignment, { foreignKey: "class_id", as: "assignments" });
Class.hasMany(ReportCard, { foreignKey: "class_id", as: "reportCards" });
Class.hasMany(Timetable, { foreignKey: "class_room_id", as: "timetableSlots" });