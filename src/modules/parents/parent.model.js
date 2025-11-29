import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const Parent = db.define("parent", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
 
}, {
    tableName: "parent",
    underscored: true,
    indexes: [
        { unique: true, fields: ["user_id"] }
    ]
});

Parent.belongsTo(Users, { foreignKey: "user_id", targetKey: "id", as: "user" });


export default Parent;

