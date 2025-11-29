// models/StudentParent.model.js
import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Student from "../students/student.model.js";
import User from "../users/user.model.js";

const StudentParent = db.define("student_parent", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  student_profile_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Student, key: "id" }
  },
  parent_user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" }
  },

}, {
  underscored: true,
  indexes: [
    { fields: ["student_profile_id"] },
    { fields: ["parent_user_id"] },
    { unique: true, fields: ["student_profile_id","parent_user_id"] } // prevent dup links
  ]
});

StudentParent.belongsTo(Student, { foreignKey: "student_profile_id", as: "student" });
StudentParent.belongsTo(User, { foreignKey: "parent_user_id", as: "parent" });

export default StudentParent;
