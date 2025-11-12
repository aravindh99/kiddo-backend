import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Classes from "../classes/classes.model.js";
import Schools from "../schools/school.model.js";
import Sections from "../sections/section.model.js";
import Teachers from "../teachers/teacher.model.js";

const assignment = db.define("assignment", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    School_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "schools",
            key: "id"
        }
    },
    class_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "classes",
            key: "id"
        }
    },
    section_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "sections",
            key: "id"
        }
    },
    teacher_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "teachers",
            key: "id"
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
});
assignment.belongsTo(Schools, { foreignKey: "School_id", targetKey: "id", as: "school" });
assignment.belongsTo(Classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
assignment.belongsTo(Sections, { foreignKey: "section_id", targetKey: "id", as: "section" });
assignment.belongsTo(Teachers, { foreignKey: "teacher_id", targetKey: "id", as: "teacher" });
export default assignment;