import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Students from "../students/student.model.js";
import Classes from "../classes/classes.model.js";
import Sections from "../sections/section.model.js";
import Users from "../users/user.model.js";

const reportcard = db.define("reportcard", {
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
    term: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grades: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    gpa: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: false
    },
    generated_by: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    generated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        default: DataTypes.NOW
    }
});

reportcard.belongsTo(Classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
reportcard.belongsTo(Users, { foreignKey: "generated_by", targetKey: "id", as: "generated_by" });
reportcard.belongsTo(Sections, { foreignKey: "section_id", targetKey: "id", as: "section" });
reportcard.belongsTo(Students, { foreignKey: "student_id", targetKey: "id", as: "student" });

export default reportcard;