import { useState } from "react";
import Home from "./pages/Home";
import Voorraad from "./pages/Voorraad";
import Levering from "./pages/Toeleveringsketen/Levering";

const App = () => {
  const [page, setPage] = useState("home");

  switch (page) {
    case "home":
      return <Home setPage={setPage} />;
    case "voorraad":
      return <Voorraad setPage={setPage} />;
    case "levering":
      return <Levering setPage={setPage} />;
    default:
      return <p>Pagina niet gevonden</p>;
  }
};

export default App;
