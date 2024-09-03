import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",

        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      // console.log(response.data);
      Cookies.set("vinted-token", response.data.token, { expires: 15 });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (errorMessage === "message parameter") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else if (errorMessage === 409) {
        setErrorMessage("L'email est déjà utilisé");
      } else {
        setErrorMessage("L'email ou le mot est incorrect");
      }
    }
  };
  return (
    <main>
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={() => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={() => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={() => {
            setPassword(event.target.value);
          }}
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
          <div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">S'inscrire</button>
        <Link className="login" to="/login">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </main>
  );
};

export default Signup;
