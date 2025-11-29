
import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Quiz from "./quiz.model.js";

const QuizQuestion = db.define("quiz_question", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quiz_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Quiz, 
      key: "id",
    },
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  correct_option_index: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "quiz_question",
  underscored: true,
  indexes: [
    { unique: true, fields: ["quiz_id", "index"] }
  ]
});


Quiz.hasMany(QuizQuestion, { foreignKey: "quiz_id", as: "questions" });
QuizQuestion.belongsTo(Quiz, { foreignKey: "quiz_id", as: "quiz" });

export default QuizQuestion;
