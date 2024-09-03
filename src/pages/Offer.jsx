import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <div className="offer-container">
        <img src={data.product_image.secure_url} alt={data.product_name} />
        <div className="column-right">
          <p className="price">{data.product_price} €</p>

          <div>
            {data.product_details.map((detail, index) => {
              // console.log("detail ===> ", detail);
              const keys = Object.keys(detail);
              // console.log("keys ===> ", keys);
              const key = keys[0];
              // console.log("key ===> ", key);

              return (
                <div key={index}>
                  <div className="article-list">
                    <span>{key} :</span>
                    <span>{detail[key]}</span>
                  </div>
                  <div>{/* <p>{data.product_name}</p> */}</div>
                </div>
              );
            })}
          </div>
          <div className="offer-description">
            <p className="name">{data.product_name}</p>
            <p className="legend">{data.product_description}</p>
          </div>
          <Link
            to="/payment"
            state={{ title: data.product_name, price: data.product_price }}
          >
            <button>Acheter</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Offer;
