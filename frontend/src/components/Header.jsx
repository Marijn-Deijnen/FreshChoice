import Logo from "./Logo";
import Button from "./Button";
import Separator from "./Separator";

const Header = ({ setPage }) => {
  return (
    <header>
      <Logo />
      <p>
        <Button onClick={() => setPage("home")} label="Home" />
        <Button onClick={() => setPage("levering")} label="Toeleveringsketen" />
        <Button onClick={() => setPage("voorraad")} label="Voorraadbeheer" />
      </p>
      <Separator />
    </header>
  );
};

export default Header;
