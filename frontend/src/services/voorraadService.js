import axios from "axios";

const getAllProducts = async () => {
  const response = await axios.get("/api/product");
  return response.data;
};

const updateProduct = async ({
  barcode,
  naam,
  prijs,
  sku,
  voorraad_aantal,
  uitgevoerd_door,
  type,
}) => {
  const response = await axios.put(`/api/product/${barcode}`, {
    naam,
    prijs,
    sku,
    voorraad_aantal,
    uitgevoerd_door,
    type,
  });
  return response.data;
};

export default { getAllProducts, updateProduct };
