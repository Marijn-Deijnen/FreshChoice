import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

class Product extends Model {}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    naam: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    prijs: {
      type: DataTypes.DECIMAL(10, 2),
    },
    voorraad_aantal: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "producten",
    modelName: "Product",
    timestamps: false,
  },
);

export default Product;
