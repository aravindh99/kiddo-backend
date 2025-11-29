import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import User from "../users/user.model.js";

const AiChatLog = db.define(
  "ai_chat_log",
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
    message: {
      type: DataTypes.TEXT,
    },
    response: {
      type: DataTypes.TEXT,
    },
    token_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "ai_chat_log",
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["created_at"] }
    ]
  }
);

AiChatLog.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});

export default AiChatLog;

