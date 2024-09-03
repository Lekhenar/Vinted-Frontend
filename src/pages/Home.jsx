import { Link } from "react-router-dom";
import hero from "../assets/img/hero.jpg";
// import wave from "../assets/img/wave.svg";

const Home = ({ data }) => {
  // console.log(data);

  return (
    <main>
      <img className="Home-img" src={hero} alt="image-header" />
      {/* <img className="img-waves" src={wave} alt="wave" /> */}

      <div className="text-block">
        <span>Prêts à faire du tri dans vos placards ?</span>
        <button>Commencez à vendre</button>
      </div>
      {/* <Link to="/offer">Aller sur la page offer</Link> */}

      <div className="container">
        {data.offers.map((offer) => {
          // console.log(offer.owner.account.avatar);

          return (
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <article className="offre">
                <div className="owner-card">
                  {offer.owner.account.avatar && (
                    <img
                      className="avatar"
                      src={offer.owner.account.avatar.secure_url}
                      alt=""
                    />
                  )}
                  {/* <img
                    className="avatar"
                    src={offer.owner.account.avatar.secure_url}
                    alt={offer.owner.account.username}
                  /> */}
                  <span className="username">
                    {offer.owner.account.username}
                  </span>
                </div>
                <div>
                  <img
                    className="picture-offer"
                    src={offer.product_image.secure_url}
                    alt={offer.product_name}
                  />
                </div>
                <div className="detail">
                  <span className="price">{offer.product_price}€</span>
                  <p>{offer.product_details[1].TAILLE}</p>
                  <p>{offer.product_details[0].MARQUE}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
