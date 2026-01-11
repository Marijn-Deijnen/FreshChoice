import { Model, DataTypes } from "sequelize";

export const initProductModel = (sequelize) => {
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
    },
    {
      sequelize,
      tableName: "mutaties",
      modelName: "Mutatie",
      timestamps: false,
    },
  );

  return Mutatie;
};

export default initProductModel;
