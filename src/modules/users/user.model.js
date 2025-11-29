import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Schools from "../schools/school.model.js";

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    // null for super_admin
    school_id: {
      type: DataTypes.UUID,
      references: { model: Schools, key: "id" },
    },

    // fixed roles, clean & strict
    role: {
      type: DataTypes.ENUM(
        "super_admin",
        "school_admin",
        "teacher",
        "student",
        "parent"
      ),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
    },

    phone: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING(100),
    },

    first_login: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    last_login: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "user",
    underscored: true,
    indexes: [
      { fields: ["school_id"] },
      { fields: ["role"] },
      { fields: ["phone"] },
      { unique: true, fields: ["school_id", "username"] },
    ],
  }
);

// associations
User.belongsTo(Schools, { foreignKey: "school_id", as: "school" });

export default User;
