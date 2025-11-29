import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Schools from "../schools/school.model.js";
import Student from "../students/student.model.js";
import Teacher from "../teachers/teacher.model.js";
import Parent from "../parents/parent.model.js";
import AiChatLog from "../ai-chat-logs/ai-chat-log.model.js";
import ragQueries from "../rag-queries/rag-query.model.js";
import VoiceLog from "../voice-logs/voice-log.model.js";
import Subscription from "../subscriptions/subscription.model.js";
import TokenAccount from "../tokens/token.model.js";
import TokenTransaction from "../tokens/token-transaction.model.js";
import Parent from "../parents/parent.model.js";

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    // null for super_admin
    school_id: {
      type: DataTypes.UUID,
      references: { model: Schools, key: "id" },
    },

    // fixed roles, clean & strict
    role: {
      type: DataTypes.ENUM(
        "super_admin",
        "school_admin",
        "teacher",
        "student",
        "parent"
      ),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
    },

    phone: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING(100),
    },

    first_login: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    last_login: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "user",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { fields: ["role"] },
      { fields: ["phone"] },
      { unique: true, fields: ["school_id", "username"] },
    ],
  }
);

// associations
User.belongsTo(Schools, { foreignKey: "school_id", as: "school" });

export default User;

// hasMany associations
User.hasMany(Student, { foreignKey: "user_id", as: "studentProfile" });
User.hasMany(Teacher, { foreignKey: "user_id", as: "teacherProfile" });
User.hasMany(Parent, { foreignKey: "user_id", as: "parentProfile" });
User.hasMany(AiChatLog, { foreignKey: "user_id", as: "aiChatLogs" });
User.hasMany(ragQueries, { foreignKey: "user_id", as: "ragQueries" });
User.hasMany(VoiceLog, { foreignKey: "user_id", as: "voiceLogs" });
User.hasMany(Subscription, { foreignKey: "user_id", as: "subscriptions" });
User.hasMany(TokenAccount, { foreignKey: "user_id", as: "tokenAccount" });
User.hasMany(TokenTransaction, { foreignKey: "user_id", as: "tokenTransactions" });
User.hasMany(Parent, { foreignKey: "user_id", as: "parentProfiles" });
