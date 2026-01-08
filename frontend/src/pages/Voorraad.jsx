import Button from "../components/Button";
import Separator from "../components/Separator";
import "./index.css";

const Voorraad = ({ setPage }) => {
  return (
    <div className="container">
      <h1>Voorraadbeheer</h1>
      <Separator variant="vertical" />
      <Button onClick={() => setPage("home")} size="small" label="Terug" />
    </div>
  );
};

export default Voorraad;
