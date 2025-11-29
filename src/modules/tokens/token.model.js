
import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const TokenAccount = db.define("token_account", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: { model: Users, key: "id" }
  },

 
  total_tokens: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },

 
  used_tokens: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },



  expires_at: { type: DataTypes.DATE, allowNull: true },

  
}, {
  underscored: true,
  indexes: [
    { fields: ["user_id"] },
    { fields: ["expires_at"] }
  ]
});

TokenAccount.belongsTo(Users, { foreignKey: "user_id", as: "user" });

export default TokenAccount;
