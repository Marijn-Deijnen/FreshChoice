import { useEffect, useState } from "react";
import voorraadService from "../services/voorraadService";
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import Table from "../components/Table";
import Textbox from "../components/TextBox";
import NumberBox from "../components/NumberBox";
import Modal from "../components/Modal";
import "./index.css";

const Voorraad = ({ setPage }) => {
  const [products, setProducts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await voorraadService.getAllProducts();
      console.log(result.data);
      setProducts(result.data);
    })();
  }, [refreshTrigger]);

  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPrijs, setSelectedPrijs] = useState("");
  const [selectedBarcode, setSelectedBarcode] = useState("");
  const [selectedSku, setSelectedSku] = useState("");
  const [selectedVoorraad, setSelectedVoorraad] = useState("");

  const handleEdit = (product, prijs, barcode, sku, voorraad) => {
    setSelectedProduct(product);
    setSelectedPrijs(prijs);
    setSelectedBarcode(barcode);
    setSelectedSku(sku);
    setSelectedVoorraad(voorraad);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(
    (item) =>
      item.product.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.barcode.includes(searchValue) ||
      item.sku.includes(searchValue),
  );

  const handleSave = async () => {
    setIsModalOpen(false);
    await voorraadService.updateProduct(
      selectedBarcode,
      selectedProduct,
      selectedPrijs,
      selectedSku,
      selectedVoorraad,
    );
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="container">
      <Logo />
      <p>
        <Button onClick={() => setPage("home")} label="Home" />
        <Button onClick={() => setPage("levering")} label="Toeleveringsketen" />
        <Button onClick={() => setPage("voorraad")} label="Voorraadbeheer" />
      </p>
      <Separator variant="vertical" />
      <SearchBox
        size="big"
        value={searchValue}
        placeholder="Product, barcode of SKU"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Prijs</th>
            <th>Barcode</th>
            <th>SKU</th>
            <th>Voorraad</th>
            <th>Aanpassen</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((row) => (
            <tr>
              <td>{row.product}</td>
              <td>{row.prijs}</td>
              <td>{row.barcode}</td>
              <td>{row.sku}</td>
              <td>{row.voorraad}</td>
              <td>
                <img
                  className="editbutton"
                  onClick={() =>
                    handleEdit(
                      row.product,
                      row.prijs,
                      row.barcode,
                      row.sku,
                      row.voorraad,
                    )
                  }
                  src="../assets/edit.png"
                  alt="Edit"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="container">
          <h2>Product aanpassen</h2>
          <p>Barcode: {selectedBarcode}</p>
          <p>
            Product:{" "}
            <Textbox
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            />
          </p>
          <p>
            Prijs:{" "}
            <Textbox
              value={selectedPrijs}
              onChange={(e) => setSelectedPrijs(e.target.value)}
            />
          </p>
          <p>
            SKU:{" "}
            <Textbox
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
            />
          </p>
          <p>
            Voorraad:{" "}
            <NumberBox
              value={selectedVoorraad}
              onChange={(e) => setSelectedVoorraad(e.target.value)}
            />
          </p>
          <p>
            <Button label="Annuleren" onClick={() => setIsModalOpen(false)} />
            <Button label="Opslaan" onClick={handleSave} />
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Voorraad;
