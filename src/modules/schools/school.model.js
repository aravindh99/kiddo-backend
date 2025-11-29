import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const School = db.define(
  "school",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    school_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    school_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cbse_affiliation_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_phone: {
      type: DataTypes.STRING,
    },
    logo_url: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "school",
    underscored: true,
  }
);

export default School;