import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";
import Schools from "../schools/school.model.js";
import Classes from "../classes/classes.model.js";

const Notifications = db.define("notification", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: "Users",
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
    priority: {
        type: DataTypes.ENUM("low", "high"),
        defaultValue: "low"
    },
    school_id: {
        type: DataTypes.UUID,
        allowNull: true
    },

    class_id: {
        type: DataTypes.UUID,
        allowNull: true
    },

    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    indexes: [
        { fields: ["user_id"] },
        { fields: ["class_id"] },
        { fields: ["school_id"] },
        { fields: ["user_id", "is_read"] }
      ]
});

Notifications.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });
Users.hasMany(Notifications, { foreignKey: "user_id", as: "notifications" });

Notifications.belongsTo(Schools, { foreignKey: "school_id", targetKey: "id", as: "school" });
Schools.hasMany(Notifications, { foreignKey: "school_id", as: "schoolNotifications" });

Notifications.belongsTo(Classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
Classes.hasMany(Notifications, { foreignKey: "class_id", as: "classNotifications" });

export default Notifications;