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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "producten", key: "product_id" },
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
    mutatie_actie_id: {
      type: DataTypes.INTEGER,
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
