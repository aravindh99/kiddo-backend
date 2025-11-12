import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";
import Schools from "../schools/school.model.js";

const notifications = db.define("notification", {
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
    school_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "schools",
            key: "id"
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payload: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

notifications.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });
notifications.belongsTo(Schools, { foreignKey: "school_id", targetKey: "id", as: "school" });
export default notifications;