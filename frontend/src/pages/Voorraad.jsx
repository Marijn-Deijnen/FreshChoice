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

  return (
    <div className="container">
      <Logo />
      <h1>Voorraadbeheer</h1>
      <Separator variant="vertical" />
      <SearchBox
        size="big"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <Button onClick={() => setPage("home")} size="small" label="Terug" />
        <Button type="button" label="Open model" onClick={() => setIsModalOpen(true)} />
    <Table />
    <Modal open={isModalOpen} onclose={() => setIsModalOpen(false)}>
      <h2>test</h2>
      <Button type="button" label="Annuleren" onClick={() => setIsModalOpen(false)} />
      </Modal>
    </div>    
  
  );
};

export default Voorraad;
