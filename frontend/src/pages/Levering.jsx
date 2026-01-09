import Button from "../components/Button";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import "./index.css";

const Levering = ({ setPage }) => {
  return (
    <div className="container">
      <Logo />
      <h1>Toeleveringsketen</h1>
      <Separator />
      <Button onClick={() => setPage("home")} size="small" label="Terug" />
    </div>
  );
};

export default Levering;
