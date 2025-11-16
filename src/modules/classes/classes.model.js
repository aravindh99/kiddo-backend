import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import schools from "../schools/school.model.js";

const classes = db.define("class", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    class_id: {
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
    grade: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
classes.belongsTo(schools, { foreignKey: "school_id", targetKey: "id", as: "school" });
export default classes;