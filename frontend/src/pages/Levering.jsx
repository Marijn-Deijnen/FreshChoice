import Button from "../components/Button";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import "./index.css";

const Levering = ({ setPage }) => {
  return (
    <div className="container">
      <Logo />
      <p>
        <Button onClick={() => setPage("home")} label="Home" />
        <Button onClick={() => setPage("levering")} label="Toeleveringsketen" />
        <Button onClick={() => setPage("voorraad")} label="Voorraadbeheer" />
      </p>
      <Separator />
      <Button onClick={() => setPage("home")} size="small" label="Terug" />
    </div>
  );
};

export default Levering;
