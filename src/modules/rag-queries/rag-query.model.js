import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const ragQueries = db.define("rag_query", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
    query_text: {
        type: DataTypes.TEXT
    },
    pinecone_vector_id: {
        type: DataTypes.STRING
    },
    results: {
        type: DataTypes.JSONB
    },
}, {
    tableName: "rag_query",
    underscored: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["created_at"] }
    ]
});

ragQueries.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });

export default ragQueries;

