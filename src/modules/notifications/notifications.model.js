import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const Notification = db.define(
  "notification",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    type: {
      type: DataTypes.ENUM(
        "assignment",
        "attendance",
        "announcement",
        "quiz",
        "game",
        "system"
      ),
      allowNull: false,
    },

    payload: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM("low", "high"),
      allowNull: false,
      defaultValue: "low",
    },

    school_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "schools",
        key: "id",
      },
    },

    class_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "classes",
        key: "id",
      },
    },

    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "notifications",
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["user_id", "is_read"] },
      { fields: ["class_id"] },
      { fields: ["school_id"] },
      { fields: ["created_at"] },
    ],
  }
);

// Associations
export default Notification;
