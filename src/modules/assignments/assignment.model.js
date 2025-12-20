import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Class from "../classes/classes.model.js";
import School from "../schools/school.model.js";
import Teacher from "../teachers/teacher.model.js";

const Assignment = db.define(
  "assignment",
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
    class_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Class,
        key: "id",
      },
    },
    status:{
      type: DataTypes.ENUM("DRAFT", "PUBLISHED", "CLOSED"),
      defaultValue: "DRAFT",
      allowNull: false,
    },

    teacher_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Teacher,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "assignment",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { fields: ["class_id"] },
      { fields: ["teacher_id"] },
      { fields: ["due_date"] }
    ]
  }
);
Assignment.belongsTo(School, {
  foreignKey: "school_id",
  targetKey: "id",
  as: "school",
});
Assignment.belongsTo(Class, {
  foreignKey: "class_id",
  targetKey: "id",
  as: "class",
});
Assignment.belongsTo(Teacher, {
  foreignKey: "teacher_id",
  targetKey: "id",
  as: "teacher",
});
export default Assignment;