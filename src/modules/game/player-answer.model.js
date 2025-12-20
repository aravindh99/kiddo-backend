import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import GameSessionPlayer from "./game-session-player.model.js";
import QuizQuestion from "../quiz/quiz-question.model.js";

const PlayerAnswer = db.define(
  "player_answer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    session_player_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: GameSessionPlayer,
        key: "id",
      },
    },

    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: QuizQuestion,
        key: "id",
      },
    },

    selected_option_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    time_taken_ms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    answered_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "player_answer",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["session_player_id", "question_id"],
        name: "uq_player_answer_session_question",
      },
      { fields: ["session_player_id"] },
      { fields: ["question_id"] },
      { fields: ["answered_at"] },
    ],
  }
);

// Associations
GameSessionPlayer.hasMany(PlayerAnswer, {
  foreignKey: "session_player_id",
  as: "answers",
});
PlayerAnswer.belongsTo(GameSessionPlayer, {
  foreignKey: "session_player_id",
  as: "sessionPlayer",
});

QuizQuestion.hasMany(PlayerAnswer, {
  foreignKey: "question_id",
  as: "answers",
});
PlayerAnswer.belongsTo(QuizQuestion, {
  foreignKey: "question_id",
  as: "question",
});

export default PlayerAnswer;
