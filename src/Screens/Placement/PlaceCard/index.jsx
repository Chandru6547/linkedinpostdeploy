import React from "react";
import "./PlaceCard.scss";
import { Men, Women } from "../../../Assets";

const PlaceCard = ({ item }) => {

  return (
    <div className="PlaceCard">
      <div className="CardHead">
        <div
          className="circle"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:
              item.gender === "men" ? `url(${Men})` : `url(${Women})`,
          }}
        ></div>
        <div className="desc">
          <h1>{item.name}</h1>
          <p style={{ textAlign: "left" }}>{item.job}</p>
        </div>
      </div>
      <h5>{item.description}</h5>
    </div>
  );
};

export default PlaceCard;
