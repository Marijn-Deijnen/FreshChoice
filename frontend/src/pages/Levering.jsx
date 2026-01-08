import Button from "../components/Button";
import Separator from "../components/Separator";
import "./index.css";

const Levering = ({ setPage }) => {
  return (
    <div className="container">
      <h1>Toeleveringsketen</h1>
      <Separator />
      <Button onClick={() => setPage("home")} size="small" label="Terug" />
    </div>
  );
};

export default Levering;
