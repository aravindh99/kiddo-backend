import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Student from "../students/student.model.js";
import Class from "../classes/classes.model.js";

const ReportCard = db.define(
  "report_card",
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
    class_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Class,
        key: "id",
      },
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grades: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    gpa: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "report_card",
    underscored: true,
    indexes: [
      { fields: ["student_id"] },
      { fields: ["class_id"] },
      { fields: ["year", "term"] }
    ]
  }
);

ReportCard.belongsTo(Class, {
  foreignKey: "class_id",
  targetKey: "id",
  as: "class",
});
ReportCard.belongsTo(Student, {
  foreignKey: "student_id",
  targetKey: "id",
  as: "student",
});

export default ReportCard;