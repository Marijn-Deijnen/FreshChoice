import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

class Levering extends Model {}

Levering.init(
  {
    levering_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    leverancier: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    inhoud: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    aankomst: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "leveringen",
    modelName: "Levering",
    timestamps: false,
  },
);

export default Levering;
