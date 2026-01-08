import Button from "../components/Button";
import Separator from "../components/Separator";
import "./index.css";

const Home = ({ setPage }) => {
  return (
    <div className="container">
      <h1>FreshChoice Home</h1>
      <Separator />
      <Button onClick={() => setPage("levering")} label="Toeleveringsketen" />
      <Button onClick={() => setPage("voorraad")} label="Voorraadbeheer" />
    </div>
  );
};

export default Home;
