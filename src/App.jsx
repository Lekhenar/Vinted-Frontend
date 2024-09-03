import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

// ----- PAGES -----
import logo from "./assets/img/logo.png";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);
  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 10 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=" +
            search
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <>
      {isLoading ? (
        <p>Chargement..</p>
      ) : (
        <Router>
          <header>
            <div className="header-container">
              <Link to={"/"}>
                <img src={logo} alt="logo-Vinted" />
              </Link>
              <input
                className="search"
                type="search"
                placeholder="Rechercher des articles"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              <nav>
                {token ? (
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => {
                      handleToken(null);
                    }}
                  >
                    Deconnexion
                  </button>
                ) : (
                  <>
                    <Link to="/signup">
                      <button>S'inscrire</button>
                    </Link>
                    <Link to="/login">
                      <button>Se connecter</button>
                    </Link>
                  </>
                )}
                <Link to="/publish">
                  <button className="sell-items">Vends tes articles</button>
                </Link>
              </nav>
            </div>
          </header>
          <main>
            <Routes>
              <Route
                path="/"
                element={<Home data={data} Home search={search} />}
              />
              <Route path="/offers/:id" element={<Offer />} />
              <Route
                path="/signup/"
                element={<Signup handleToken={handleToken} />}
              />
              <Route
                path="/Login/"
                element={<Login handleToken={handleToken} />}
              />
              <Route path="/Publish/" element={<Publish token={token} />} />
              <Route path="/Payment/" element={<Payment />} />
            </Routes>
          </main>
        </Router>
      )}
    </>
  );
}

export default App;
