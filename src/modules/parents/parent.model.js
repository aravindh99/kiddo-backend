import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import User from "../users/user.model.js";
import Student from "../students/student.model.js";

const Parent = db.define(
  "parent",
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
    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relation_type: {
      type: DataTypes.ENUM("mother", "father", "guardian"),
      allowNull: true,
    },
  },
  {
    tableName: "parent",
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["student_id"] },
      {
        unique: true,
        fields: ["student_id", "user_id"],
      },
    ],
  }
);

Parent.belongsTo(User, { foreignKey: "user_id", as: "user" });
Parent.belongsTo(Student, { foreignKey: "student_id", as: "student" });

export default Parent;