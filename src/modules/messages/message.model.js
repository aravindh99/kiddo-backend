import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";
import Schools from "../schools/school.model.js";



const messages = db.define("message", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    sender_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    receiver_id: {
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
    thread_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attachments: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    send_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now
    }

});

messages.belongsTo(Users, { foreignKey: "sender_id", targetKey: "id", as: "sender" });
messages.belongsTo(Users, { foreignKey: "receiver_id", targetKey: "id", as: "receiver" });
messages.belongsTo(Schools, { foreignKey: "school_id", targetKey: "id", as: "school" });
export default messages;