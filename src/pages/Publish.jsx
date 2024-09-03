// import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", title); // j'ajoute dans mion formdata une paire clé valeur
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form className="publish-form" onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        <label className="file-upload">
          <span>+ Ajouter une photo</span>
          <input
            type="file"
            onChange={(e) => {
              // console.log(e.target.files[0]);
              setPicture(e.target.files[0]);
            }}
          />
          {picture && (
            <img src={URL.createObjectURL(picture)} alt="preview picture" />
          )}
        </label>
        <div className="input-container">
          <div>
            <h3>Titre</h3>
            <input
              className="title"
              type="text"
              value={title}
              placeholder="ex: Chemise Sézane verte"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Décris ton article</h3>
            <input
              className="description-product"
              type="text"
              value={description}
              placeholder="ex: Porté quelque fois, taille correctement"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Prix</h3>
            <input
              type="text"
              value={price}
              placeholder="0.00€"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Etat</h3>
            <input
              type="text"
              value={condition}
              placeholder="Neuf avec étiquette"
              onChange={(e) => {
                setCondition(e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Lieu</h3>
            <input
              type="text"
              value={city}
              placeholder="ex: Paris"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Marque</h3>
            <input
              type="text"
              value={brand}
              placeholder="ex: Nike"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Taille</h3>
            <input
              type="text"
              value={size}
              placeholder="ex: L/36/40"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Couleur</h3>
            <input
              type="text"
              value={color}
              placeholder="ex: Rouge"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
      <button className="envoyer">Envoyer</button>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Publish;
