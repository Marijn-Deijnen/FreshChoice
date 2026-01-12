import { useState } from "react";
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import Table from "../components/Table";
import Textbox from "../components/TextBox";
import NumberBox from "../components/NumberBox";
import Modal from "../components/Modal2";
import "./index.css";

const Voorraad = ({ setPage }) => {
  const [textValue, setTextValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPrijs, setSelectedPrijs] = useState(null);
  const [selectedBarcode, setSelectedBarcode] = useState(null);
  const [selectedsku, setSelectedsku] = useState(null);
  const [selectedvoorraad, setSelectedvoorraad] = useState(null);
  const mockData = [
    {
      product: "Appel",
      prijs: "€1,45",
      barcode: "1858742704",
      sku: "5835-1839",
      voorraad: 54,
    },
    {
      product: "Peer",
      prijs: "€1,55",
      barcode: "693074709",
      sku: "0128-3291",
      voorraad: 89,
    },
    {
      product: "Tomaat",
      prijs: "€1,10",
      barcode: "359635678",
      sku: "0537-8942",
      voorraad: 8,
    },
  ];
  const handleEdit = (product, prijs, barcode, sku, voorraad) => {
    setSelectedProduct(product);
    setSelectedPrijs(prijs);
    setSelectedBarcode(barcode);
    setSelectedsku(sku);
    setSelectedvoorraad(voorraad);
    setIsModalOpen(true);
  };
  const filteredData = mockData.filter(
    (item) =>
      item.product.toLowerCase().includes(textValue.toLowerCase()) ||
      item.barcode.includes(textValue) ||
      item.sku.includes(textValue),
  );

  return (
    <div className="container">
      <Logo />
      <h1>Voorraadbeheer</h1>
      <Separator variant="vertical" />
      <SearchBox
        size="big"
        value={textValue}
        placeholder="Product, barcode of SKU"
        onChange={(e) => setTextValue(e.target.value)}
      />
      <Button onClick={() => setPage("home")} size="small" label="Terug" />
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
          {filteredData.map((row) => (
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
          <p>
            Product: <Textbox value={selectedProduct} />
          </p>
          <p>
            Prijs: <Textbox value={selectedPrijs} />
          </p>
          <p>
            Barcode: <Textbox value={selectedBarcode} />
          </p>
          <p>
            sku: <Textbox value={selectedsku} />
          </p>
          <p>
            Voorraad: <NumberBox value={selectedvoorraad} />
          </p>

          <Button label="Annuleren" onClick={() => setIsModalOpen(false)} />
          <Button label="Opslaan" onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Voorraad;
