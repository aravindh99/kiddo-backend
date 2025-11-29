// models/StudentParent.model.js
import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const StudentParent = db.define("student_parent", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  student_profile_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "students", key: "id" }
  },
  parent_user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "users", key: "id" }
  },

}, {

  indexes: [
    { fields: ["student_profile_id"] },
    { fields: ["parent_user_id"] },
    { unique: true, fields: ["student_profile_id","parent_user_id"] } // prevent dup links
  ]
});

export default StudentParent;
