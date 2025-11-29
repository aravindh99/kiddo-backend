import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import School from "../schools/school.model.js";
import Teachers from "../teachers/teacher.model.js";

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