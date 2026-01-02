import { DataTypes } from "sequelize";
import db from "../../config/db.js";
// imports removed

const Subscription = db.define(
  "subscription",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },

    // Stripe identifiers
    stripe_customer_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    stripe_subscription_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    stripe_product_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripe_price_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

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
      allowNull: false,
      defaultValue: "incomplete",
    },

    // Billing periods
    current_period_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    current_period_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // Cancellation flags
    cancel_at_period_end: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canceled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // Business fields
    plan_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan_tokens: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "subscriptions",
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["stripe_customer_id"] },
      { fields: ["status"] },
    ],
  }
);

// Associations (BEFORE EXPORT)
export default Subscription;
