import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";
import Students from "../students/student.model.js";
import Classes from "../classes/classes.model.js";
import Sections from "../sections/section.model.js";

const attendance = db.define("attendance", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "students",
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
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marked_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    marked_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});
attendance.belongsTo(Students, { foreignKey: "student_id", targetKey: "id", as: "student" });
attendance.belongsTo(Classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
attendance.belongsTo(Sections, { foreignKey: "section_id", targetKey: "id", as: "section" });
attendance.belongsTo(Users, { foreignKey: "marked_by", targetKey: "id", as: "user" });
export default attendance;