import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/signup">S'inscrire</Link>
      <Link to="login">Se connecter</Link>
    </header>
  );
};

export default Header;
