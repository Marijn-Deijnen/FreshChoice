import axios from "axios";

const getAllProducts = async () => {
  const products = await axios.get("/api/product");
  return products;
};

const updateProduct = async (barcode, naam, prijs, sku, voorraad_aantal) => {
  await axios.put(`/api/product/${barcode}`, {
    naam,
    prijs,
    voorraad_aantal,
  });
};

export default { getAllProducts, updateProduct };
