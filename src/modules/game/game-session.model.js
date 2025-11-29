// src/modules/game/game-session.model.js
import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Quiz from "../quiz/quiz.model.js";
import Users from "../users/user.model.js";

const GameSession = db.define("game_session", {
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
  mode: {
    type: DataTypes.ENUM("SINGLE", "MULTI"),
    allowNull: false,
  },
  room_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  host_user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
  max_players: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("LOBBY", "IN_PROGRESS", "FINISHED", "CANCELLED"),
    allowNull: false,
    defaultValue: "LOBBY",
  },
  started_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  ended_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "game_session",
  underscored: true,
  indexes: [
    { fields: ["quiz_id"] },
    { fields: ["host_user_id"] },
    { fields: ["status"] },
    { fields: ["room_code"] }
  ]
});

// Associations
Quiz.hasMany(GameSession, { foreignKey: "quiz_id", as: "sessions" });
GameSession.belongsTo(Quiz, { foreignKey: "quiz_id", as: "quiz" });

Users.hasMany(GameSession, {
  foreignKey: "host_user_id",
  as: "hostedSessions",
});
GameSession.belongsTo(Users, {
  foreignKey: "host_user_id",
  as: "host",
});

export default GameSession;
