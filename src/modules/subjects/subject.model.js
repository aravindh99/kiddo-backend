import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const subjects = db.define("subject", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    subject_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
});

export default subjects;