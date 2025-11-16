import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import classes from "../classes/classes.model.js";

const sections = db.define("section", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    class_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "classes",
            key: "id"
        }
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

sections.belongsTo(classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
export default sections;