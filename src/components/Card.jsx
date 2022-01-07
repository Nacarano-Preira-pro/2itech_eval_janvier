import { Link } from "react-router-dom";

const Card = ({ title, subtitle, cta, picture, handleBuyButton, identifier }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>

      {picture && <img src={picture} className="card-img-top" alt="..." />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>

        {handleBuyButton && identifier && <button className="btn btn-success" onClick={() => { handleBuyButton(identifier) }}>Ajouter</button>}
      </div>
    </div>
  );
}

export default Card;