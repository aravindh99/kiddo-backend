import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Users from "../users/user.model.js";

const Quiz = db.define(
  "quiz",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    owner_user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Users, 
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("EASY", "MEDIUM", "HARD", "ADAPTIVE"),
      allowNull: false,
    },
    num_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "quiz",
    underscored: true,
    indexes: [
      { fields: ["owner_user_id"] }
    ]
  }
);

// Associations
Users.hasMany(Quiz, { foreignKey: "owner_user_id", as: "ownedQuizzes" });
Quiz.belongsTo(Users, { foreignKey: "owner_user_id", as: "owner" });

export default Quiz;
