import axios from "axios";

const getAllProducts = async () => {
  const response = await axios.get("/api/product");
  return response.data;
};

const updateProduct = async (barcode, naam, prijs, sku, voorraad_aantal) => {
  const response = await axios.put(`/api/product/${barcode}`, {
    naam,
    prijs,
    sku,
    voorraad_aantal,
  });
  return response.data;
};

export default { getAllProducts, updateProduct };
