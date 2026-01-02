import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed to prevent circular dependency

const Student = db.define(
  "student",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
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

    admission_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profile_pic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },

    father_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mother_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    guardian_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    blood_group: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    aadhar_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    father_occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    mother_occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    family_income: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "students",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { fields: ["class_id"] },
      { fields: ["user_id"] },
      { unique: true, fields: ["school_id", "admission_no"] },
    ],
  }
);

export default Student;
