import { useState } from "react";
import Button from "../components/Button";
import SearchBox from "../components/SearchBox";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import "./index.css";

const Voorraad = ({ setPage }) => {
  const [textValue, setTextValue] = useState("");

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
    </div>
  );
};

export default Voorraad;
