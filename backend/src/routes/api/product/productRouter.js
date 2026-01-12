import express from "express";
import Product from "../../../models/Product.js";

const productRouter = express.Router();

productRouter.use(express.json());

productRouter.post("/", async (req, res) => {
  console.log(req.body);
  const { barcode, naam, sku, prijs, voorraad_aantal } = req.body;

  const existing = await Product.findOne({ where: { naam } });
  if (existing) {
    return res
      .status(409)
      .json({ error: `Product bestaat al: barcode ${existing.barcode}` });
  }

  const newProduct = await Product.create({
    barcode,
    naam,
    sku,
    prijs,
    voorraad_aantal,
  });
  res.status(201).json(newProduct);
});

productRouter.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json(products);
});

productRouter.get("/:barcode", async (req, res) => {
  const { barcode } = req.params;
  const product = await Product.findByPk(barcode);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Product niet gevonden" });
  }
});

productRouter.put("/:barcode", async (req, res) => {
  const { barcode } = req.params;
  const { naam, prijs, voorraad_aantal } = req.body;

  const product = await Product.findByPk(barcode);
  if (!product) {
    return res.status(404).json({ error: "Product niet gevonden" });
  }

  await product.update({
    naam: naam ?? product.naam,
    prijs: prijs ?? product.prijs,
    voorraad_aantal: voorraad_aantal ?? product.voorraad_aantal,
  });

  res.status(200).json({ message: "Product aangepast" });
});

productRouter.delete("/:barcode", async (req, res) => {
  const { barcode } = req.params;
  const deleted = await Product.destroy({ where: { barcode } });
  if (deleted) {
    res.status(200).json({ message: "Product verwijderd" });
  } else {
    res.status(404).json({ error: "Product niet gevonden" });
  }
});

export default productRouter;
