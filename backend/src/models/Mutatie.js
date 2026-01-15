import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

class Mutatie extends Model {}

Mutatie.init(
  {
    mutatie_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    barcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "producten", key: "barcode" },
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    hoeveelheid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uitgevoerd_door: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    tableName: "mutaties",
    modelName: "Mutatie",
    timestamps: false,
  },
);

export default Mutatie;
