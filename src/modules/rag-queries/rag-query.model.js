import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const ragQueries = db.define("RAGQuery", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    queryText: {
        type: DataTypes.TEXT
    },
    pineconeVectorId: {
        type: DataTypes.STRING
    },
    results: {
        type: DataTypes.JSONB
    },
});

ragQueries.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });

export default ragQueries;

