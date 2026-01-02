import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const RagQuery = db.define(
  "rag_query",
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

    purpose: {
      type: DataTypes.ENUM(
        "lesson_note",
        "explanation",
        "question",
        "revision",
        "general"
      ),
      allowNull: false,
      defaultValue: "general",
    },

    query_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    vector_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    vector_store: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "pinecone",
    },

    results: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    tableName: "rag_queries",
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["purpose"] },
      { fields: ["created_at"] },
    ],
  }
);

// Associations
export default RagQuery;
