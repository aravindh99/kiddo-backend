import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Classes from "../classes/classes.model.js";
import Sections from "../sections/section.model.js";
import Teachers from "../teachers/teacher.model.js";

const timetable = db.define("timetable", {
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
    section_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "sections",
            key: "id"
        }
    },
    day_of_week: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teacher_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "teachers",
            key: "id"
        }
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
});

timetable.belongsTo(Classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
timetable.belongsTo(Sections, { foreignKey: "section_id", targetKey: "id", as: "section" });
timetable.belongsTo(Teachers, { foreignKey: "teacher_id", targetKey: "id", as: "teacher" });
export default timetable;