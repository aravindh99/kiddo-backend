import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";
import Schools from "../schools/school.model.js";


const aitoken = db.define("aitoken", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    school_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "schools",
            key: "id"
        }
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    session_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    request_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prompt_tokens: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

aitoken.belongsTo(Schools, { foreignKey: "school_id", targetKey: "id", as: "school" });
aitoken.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });
export default aitoken