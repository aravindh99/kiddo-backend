import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const roles = db.define("role", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission_key: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default roles;