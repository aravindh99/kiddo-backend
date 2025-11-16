import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";
import Schools from "../schools/school.model.js";
import Classes from "../classes/class.model.js";
import Sections from "../sections/section.model.js";

const students = db.define("student", {
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
    school_id: {
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
    admission_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    father_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mother_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blood_group: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aadhar_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    father_occupation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mother_occupation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    income: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
});
students.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });
students.belongsTo(Schools, { foreignKey: "school_id", targetKey: "id", as: "school" });
students.belongsTo(Classes, { foreignKey: "class_id", targetKey: "id", as: "class" });
students.belongsTo(Sections, { foreignKey: "section_id", targetKey: "id", as: "section" });


export default students;