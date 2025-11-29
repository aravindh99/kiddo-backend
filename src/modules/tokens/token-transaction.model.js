
import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";
import Subscription from "./Subscription.model.js"; 

const TokenTransaction = db.define("token_transaction", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "users", key: "id" }
  },


  subscription_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: "subscriptions", key: "id" }
  },

  // positive or negative change
  change: { type: DataTypes.INTEGER, allowNull: false },


  balance_before: { type: DataTypes.INTEGER, allowNull: true },
  balance_after: { type: DataTypes.INTEGER, allowNull: true },

}, {
  indexes: [
    { fields: ["user_id"] },
    { fields: ["subscription_id"] },
    { fields: ["createdAt"] }
  ]
});

TokenTransaction.belongsTo(Users, { foreignKey: "user_id", as: "user" });
TokenTransaction.belongsTo(Subscription, { foreignKey: "subscription_id", as: "subscription" });

export default TokenTransaction;
