import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const teachers = db.define("teacher", {
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
    employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjects: {
        type: DataTypes.STRING,
        allowNull: false
    },
    joning_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qualifications: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

teachers.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });

export default teachers;