import { useState } from "react";
import Home from "./pages/Home";
import Voorraad from "./pages/Voorraad";
import Levering from "./pages/Toeleveringsketen/Levering";
import Header from "./components/Header";

const Content = ({ page }) => {
  switch (page) {
    case "home":
      return <Home />;
    case "voorraad":
      return <Voorraad />;
    case "levering":
      return <Levering />;
    default:
      return <p>Pagina niet gevonden</p>;
  }
};

const App = () => {
  const [page, setPage] = useState("home");

  return (
    <>
      <Header setPage={setPage} />
      <Content page={page} />
    </>
  );
};

export default App;
