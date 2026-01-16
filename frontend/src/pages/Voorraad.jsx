import { useEffect, useState } from "react";
import voorraadService from "../services/voorraadService";
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import Textbox from "../components/TextBox";
import NumberBox from "../components/NumberBox";
import Modal from "../components/Modal";
import "./index.css";
import { MUTATIE_TYPE_ARRAY } from "../constants/mutatie_type";

const Voorraad = () => {
  const [products, setProducts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await voorraadService.getAllProducts();
      setProducts(result);
    })();
  }, [refreshTrigger]);

  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPrijs, setSelectedPrijs] = useState("");
  const [selectedBarcode, setSelectedBarcode] = useState("");
  const [selectedSku, setSelectedSku] = useState("");
  const [selectedVoorraad, setSelectedVoorraad] = useState("");
  const [initialVoorraad, setInitialVoorraad] = useState("");

  const isMutatie = selectedVoorraad !== initialVoorraad;
  const mutatie = Number(selectedVoorraad) - initialVoorraad;
  const [werknemerNaam, setWerknemerNaam] = useState("");
  const [mutatieType, setMutatieType] = useState(3);

  const handleEdit = (product, prijs, barcode, sku, voorraad) => {
    setSelectedProduct(product);
    setSelectedPrijs(prijs);
    setSelectedBarcode(barcode);
    setSelectedSku(sku);
    setSelectedVoorraad(String(voorraad));
    setInitialVoorraad(String(voorraad));
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(
    (item) =>
      item.naam.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.barcode.includes(searchValue) ||
      item.sku.includes(searchValue),
  );

  const sortedProducts = filteredProducts.sort((a, b) =>
    a.naam.localeCompare(b.naam),
  );

  const handleSave = async () => {
    setIsModalOpen(false);
    await voorraadService.updateProduct({
      barcode: selectedBarcode,
      naam: selectedProduct,
      prijs: selectedPrijs,
      sku: selectedSku,
      voorraad_aantal: selectedVoorraad,
      uitgevoerd_door: isMutatie && werknemerNaam,
      type: isMutatie && mutatieType,
    });
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="container">
      <h2>Voorraadbeheer</h2>
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
          {sortedProducts.map((row) => (
            <tr key={row.barcode}>
              <td>{row.naam}</td>
              <td>{row.prijs}</td>
              <td>{row.barcode}</td>
              <td>{row.sku}</td>
              <td>{row.voorraad_aantal}</td>
              <td>
                <img
                  className="editbutton"
                  onClick={() =>
                    handleEdit(
                      row.naam,
                      row.prijs,
                      row.barcode,
                      row.sku,
                      row.voorraad_aantal,
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
          {isMutatie && (
            <>
              <p>
                Mutatie: {mutatie > 0 && "+"}
                {mutatie}
              </p>
              <p>
                Naam Werknemer:{" "}
                <Textbox
                  value={werknemerNaam}
                  onChange={(e) => setWerknemerNaam(e.target.value)}
                />
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <p>Mutatietype: </p>
                <Dropdown
                  value={mutatieType}
                  onChange={(e) => setMutatieType(e.target.value)}
                  options={MUTATIE_TYPE_ARRAY.map((label, value) => ({
                    value,
                    label,
                  }))}
                />
              </div>
            </>
          )}
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
