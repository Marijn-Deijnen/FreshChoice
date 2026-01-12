import Button from "../components/Button";
import Separator from "../components/Separator";
import Logo from "../components/Logo";
import "./index.css";

const Home = ({ setPage }) => {
  return (
    <div className="container">
      <Logo />
      <h1>Home</h1>
      <Separator />
      <Button onClick={() => setPage("levering")} label="Toeleveringsketen" />
      <Button onClick={() => setPage("voorraad")} label="Voorraadbeheer" />
    </div>
  );
};

export default Home;
