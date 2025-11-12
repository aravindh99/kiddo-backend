import { Datatypes } from "sequelize";
import db from "../../config/db.js";
import classes from "../classes/classes.model.js";
import teachers from "../teachers/teacher.model.js";

const classteacher = db.define("classteacher", {
    id: {
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey: true
    },
    class_id: {
        type: Datatypes.UUID,
        allowNull: false,
        references: {
            model: "classes",
            key: "id"
        }
    },
    teacher_id: {
        type: Datatypes.UUID,
        allowNull: false,
        references: {
            model: "teachers",
            key: "id"
        }
    },
    role: {
        type: Datatypes.STRING,
        allowNull: false
    }
});

classteacher.belongsTo(classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
classteacher.belongsTo(teachers, { foreignKey: "teacher_id", targetKey: "id", as: "teacher" });
export default classteacher;