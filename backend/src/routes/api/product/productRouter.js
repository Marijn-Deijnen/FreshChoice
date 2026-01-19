import express from "express";
import Product from "../../../models/Product.js";
import Mutatie from "../../../models/Mutatie.js";

const productRouter = express.Router();

productRouter.use(express.json());

productRouter.post("/", async (req, res) => {
  console.log("POST /api/product");
  const { barcode: product_id, naam, sku, prijs, voorraad_aantal } = req.body;

  const existing = await Product.findOne({ where: { naam } });
  if (existing) {
    return res
      .status(409)
      .json({ error: `Product bestaat al: id ${existing.product_id}` });
  }

  const newProduct = await Product.create({
    product_id,
    naam,
    sku,
    prijs,
    voorraad_aantal,
  });
  res.status(201).json(newProduct);
});

productRouter.get("/", async (req, res) => {
  console.log("GET /api/product");
  const products = await Product.findAll();
  res.status(200).json(products);
});

productRouter.get("/:id", async (req, res) => {
  console.log("GET /api/product/:id");
  const { id: product_id } = req.params;
  const product = await Product.findByPk(product_id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Product niet gevonden" });
  }
});

productRouter.put("/:id", async (req, res) => {
  console.log("PUT /api/product/:id");
  const { id: product_id } = req.params;
  const { naam, sku, prijs, voorraad_aantal, uitgevoerd_door, type } = req.body;

  const product = await Product.findByPk(product_id);
  if (!product) {
    return res.status(404).json({ error: "Product niet gevonden" });
  }

  if (voorraad_aantal && voorraad_aantal !== product.voorraad_aantal) {
    await Mutatie.create({
      product_id,
      type,
      hoeveelheid: voorraad_aantal - product.voorraad_aantal,
      uitgevoerd_door,
    });
  }

  await product.update({
    naam: naam ?? product.naam,
    sku: sku ?? product.sku,
    prijs: prijs ?? product.prijs,
    voorraad_aantal: voorraad_aantal ?? product.voorraad_aantal,
  });

  res.status(200).json({ message: "Product aangepast" });
});

productRouter.delete("/:id", async (req, res) => {
  console.log("DELETE /api/product/:id");
  const { id: product_id } = req.params;
  const deleted = await Product.destroy({ where: { product_id } });
  if (deleted) {
    res.status(200).json({ message: "Product verwijderd" });
  } else {
    res.status(404).json({ error: "Product niet gevonden" });
  }
});

export default productRouter;
