import { useState } from "react";
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import Table from "../components/Table";
import Textbox from "../components/TextBox";
import Modal from "../components/Modal2"
import "./index.css";

const Voorraad = ({ setPage }) => {
  const [textValue, setTextValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState(null);
  const mockData = [ { product: "Appel", prijs: "€1,45", barcode: "1858742704", sku: "5835-1839", voorraad: 54, }, { product: "Peer", prijs: "€1,55", barcode: "693074709", sku: "0128-3291", voorraad: 89, }, { product: "Tomaat", prijs: "€1,10", barcode: "359635678", sku: "0537-8942", voorraad: 8, }, ]; 
  const handleEdit = (barcode) => { setSelectedBarcode(barcode); setIsModalOpen(true); };

  return (
    <div className="container">
      <Logo />
      <h1>Voorraadbeheer</h1>
      <Separator variant="vertical" />
      <SearchBox size="big" value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
      <Button onClick={() => setPage("home")} size="small" label="Terug" />
      <Button type="button" label="Open model" onClick={() => setIsModalOpen(true)} />
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
    {mockData.map((row) => (
      <tr key={row.barcode}>
        <td>{row.product}</td>
        <td>{row.prijs}</td>
        <td>{row.barcode}</td>
        <td>{row.sku}</td>
        <td>{row.voorraad}</td>
        <td>
          <button onClick={() => handleEdit(row.barcode)}>Edit</button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Product aanpassen</h2>
        <p>Barcode: {selectedBarcode}</p>
        <Button label="Annuleren" onClick={() => setIsModalOpen(false)} />
      </Modal>
      </div>  
  
  );
};

export default Voorraad;
