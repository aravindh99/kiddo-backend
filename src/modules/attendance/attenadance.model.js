import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Student from "../students/student.model.js";
import Teacher from "../teachers/teacher.model.js";
import Class from "../classes/classes.model.js";

const Attendance = db.define(
  "attendance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marked_by: {
      type: DataTypes.UUID,
      references: {
        model: Teacher,
        key: "id",
      },
    },
    class_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Class,
        key: "id",
      },
    },
  },
  {
    tableName: "attendance",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["student_id", "date"],
      },
      { fields: ["class_id"] },
      { fields: ["marked_by"] },
      { fields: ["date"] }
    ],
  }
);
Attendance.belongsTo(Student, {
  foreignKey: "student_id",
  targetKey: "id",
  as: "student",
});
Attendance.belongsTo(Teacher, {
  foreignKey: "marked_by",
  targetKey: "id",
  as: "marked_by_teacher",
});
Attendance.belongsTo(Class, {
  foreignKey: "class_id",
  targetKey: "id",
  as: "class",
});
export default Attendance;