// src/modules/game/game-session-player.model.js
import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import GameSession from "./game-session.model.js";
import Users from "../users/user.model.js";

const GameSessionPlayer = db.define("game_session_player", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  session_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: GameSession,
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
  socket_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_host: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM(
      "JOINED",
      "READY",
      "PLAYING",
      "DISCONNECTED",
      "FINISHED"
    ),
    defaultValue: "JOINED",
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  left_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "game_session_player",
  underscored: true,
  indexes: [
    { fields: ["session_id"] },
    { fields: ["user_id"] },
    { fields: ["status"] }
  ]
});

// Associations
GameSession.hasMany(GameSessionPlayer, {
  foreignKey: "session_id",
  as: "players",
});
GameSessionPlayer.belongsTo(GameSession, {
  foreignKey: "session_id",
  as: "session",
});

Users.hasMany(GameSessionPlayer, {
  foreignKey: "user_id",
  as: "sessionPlayers",
});
GameSessionPlayer.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

export default GameSessionPlayer;
