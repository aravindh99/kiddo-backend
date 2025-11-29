import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const Subscription = db.define("subscription", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Users, key: "id" }
  },

  // Stripe identifiers
  stripe_customer_id: { type: DataTypes.STRING, allowNull: true },
  stripe_subscription_id: { type: DataTypes.STRING, allowNull: true },
  stripe_product_id: { type: DataTypes.STRING, allowNull: true },
  stripe_price_id: { type: DataTypes.STRING, allowNull: true },

  // Subscription status 
  status: {
    type: DataTypes.ENUM(
      "active",
      "trialing",
      "incomplete",
      "incomplete_expired",
      "past_due",
      "canceled",
      "unpaid",
      "expired"
    ),
    defaultValue: "incomplete"
  },

  // billing periods
  current_period_start: { type: DataTypes.DATE, allowNull: true },
  current_period_end: { type: DataTypes.DATE, allowNull: true },

  // cancellation flags
  cancel_at_period_end: { type: DataTypes.BOOLEAN, defaultValue: false },
  canceled_at: { type: DataTypes.DATE, allowNull: true },

  // Convenience / business fields
  plan_name: { type: DataTypes.STRING, allowNull: true }, 
  plan_tokens: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }, 

}, {
  underscored: true,
  indexes: [
    { fields: ["user_id"] },
    { unique: true, fields: ["stripe_subscription_id"] },
    { fields: ["stripe_customer_id"] }
  ]
});

Subscription.belongsTo(Users, { foreignKey: "user_id", as: "user" });

export default Subscription;
