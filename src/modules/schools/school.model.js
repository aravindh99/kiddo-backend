import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import User from "../users/user.model.js";
import Class from "../classes/classes.model.js";
import Teacher from "../teachers/teacher.model.js";
import Student from "../students/student.model.js";
import Subject from "../subjects/subject.model.js";
import Assignment from "../assignments/assignment.model.js";

const School = db.define(
  "school",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    school_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    school_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cbse_affiliation_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_phone: {
      type: DataTypes.STRING,
    },
    logo_url: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "school",
    underscored: true,
  }
);

export default School;

// hasMany associations
School.hasMany(User, { foreignKey: "school_id", as: "users" });
School.hasMany(Class, { foreignKey: "school_id", as: "classes" });
School.hasMany(Teacher, { foreignKey: "school_id", as: "teachers" });
School.hasMany(Student, { foreignKey: "school_id", as: "students" });
School.hasMany(Subject, { foreignKey: "school_id", as: "subjects" });
School.hasMany(Assignment, { foreignKey: "school_id", as: "assignments" });
