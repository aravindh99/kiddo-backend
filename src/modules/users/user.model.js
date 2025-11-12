import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Roles from "../roles/role.model.js";
import Schools from "../schools/school.model.js";



const Users = db.define("User", {

    id: {

        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    school_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "schools",
            key: "id"
        }
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "roles",
            key: "id"
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

Users.belongsTo(Roles, { foreignkey: "role_id", targetKey: "id", as: "roles" });
Users.belongsTo(Schools, { foreignkey: "school_id", targetKey: "id", as: "schools" });

export default Users;
