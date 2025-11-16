import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Roles from "../roles/role.model.js";
import Schools from "../schools/school.model.js";



const Users = db.define("User", {

    id: {

<<<<<<< HEAD
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4, 
         primaryKey: true 
        },

    username:    { 
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false 
    },

    password: { 
        type: DataTypes.STRING, 
        allowNull: false
    }
  })
=======
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    school_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "schools",
            key: "id"
        }
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "roles",
            key: "id"
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
});
>>>>>>> 8efd8ec2ee1331b59b560030fc5c39ee32fb7efd

Users.belongsTo(Roles, { foreignkey: "role_id", targetKey: "id", as: "roles" });
Users.belongsTo(Schools, { foreignkey: "school_id", targetKey: "id", as: "schools" });

export default Users;
