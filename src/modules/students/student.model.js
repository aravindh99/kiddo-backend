import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import User from "../users/user.model.js";
import School from "../schools/school.model.js";
import Class from "../classes/classes.model.js";

const Student = db.define(
  "student",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    school_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: School,
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
    admission_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.TEXT,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    father_name: {
      type: DataTypes.STRING,
    },
    mother_name: {
      type: DataTypes.STRING,
    },
    guardian_name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blood_group: {
      type: DataTypes.STRING,
    },
    aadhar_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    father_occupation: {
      type: DataTypes.STRING,
    },
    mother_occupation: {
      type: DataTypes.STRING,
    },
    family_income: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "student",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { fields: ["class_id"] },
      { fields: ["user_id"] },
      { unique: true, fields: ["school_id", "admission_no"] },
    ],
  }
);

Student.belongsTo(User, { foreignKey: "user_id", as: "user" });
Student.belongsTo(School, { foreignKey: "school_id", as: "school" });
Student.belongsTo(Class, { foreignKey: "class_id", as: "class" });

export default Student;