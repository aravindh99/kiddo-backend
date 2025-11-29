import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const VoiceLog = db.define("voice_log", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { 
    type: DataTypes.UUID, 
    allowNull: false, 
    references: { model: Users, key: "id" } 
  },
  text: { type: DataTypes.TEXT, allowNull: true },
  tokens_used: { type: DataTypes.INTEGER, allowNull: true }, 
}, {
  tableName: "voice_log",
  underscored: true,
  indexes: [
    { fields: ["user_id"] }, 
    { fields: ["created_at"] }
  ]
});

VoiceLog.belongsTo(Users, { foreignKey: "user_id", as: "user" });

export default VoiceLog;