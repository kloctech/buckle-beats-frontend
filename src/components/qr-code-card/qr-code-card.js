import React, { useState } from "react";
import EnableQRCode from "../enable-qrcode/enable-qrcode";
import "../../styles/qr-code/qr-code.scss";

const ItemCard = ({ item, handleTurnOn }) => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const handleOpen = (id) => {
    if (activeId !== id) {
      setQRcode(id);
      setActiveId(id);
    } else {
      setQRcode(null);
      setActiveId(null);
    }
  };

  const handleClose = () => {
    setQRcode(null);
    setActiveId(null);
  };

  return (
    <div className="item-card">
      <img src={item?.image_url} alt={item?.name} className="item-image" />
      <h5 style={{ fontSize: "12px", color: "#1B3E51", marginTop: "6px", fontWeight: "640" }}>{item.name}</h5>
      <div className="switch-container">
        <span className="lost-mode-text">{item.is_lost ? "Lost Mode" : "Active"}</span>
        <div className="toggle-container" onClick={() => handleOpen(item.id)}>
          <div className={`toggle-button ${item.is_lost ? "active" : ""}`}></div>
        </div>
      </div>
      <EnableQRCode openModal={qrcode === item.id} closeModal={() => handleTurnOn(item.id, item.qr_planet_id, handleClose)} id={item.id} qr_planet_id={item.qr_planet_id} is_lost={item.is_lost} />
    </div>
  );
};

export default ItemCard;
