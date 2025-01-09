import React, { useState } from "react";
import "../../styles/qr-code/qr-code.scss";

import toast from "react-hot-toast";
import EnableQRCode from "../enable-qrcode/enable-qrcode";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../middleware/api";
import DefaultQRCode from "../../assets/DefaultQrcode.png";

const QrCodeCard = ({ qrCodeData, getQrCodesWithOutSearch, page, searchQuery, updateQrCodeStatus }) => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();
  const handleOpen = async (id) => {
    if (qrCodeData?.is_lost) {
      await handleTurnOn(id);
    } else {
      if (activeId !== id) {
        setQRcode(id);
        setActiveId(id);
      } else {
        setQRcode(null);
        setActiveId(null);
      }
    }
  };

  const handleClose = () => {
    setQRcode(null);
    setActiveId(null);
  };
// console.log(qrCodeData)
  const handleTurnOn = async (qr_planet_id) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;

    try {
      const response = await api.put(`${url}/api/qrcode/change-status`, { code: qr_planet_id });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      handleClose();
      updateQrCodeStatus(qr_planet_id, !qrCodeData.is_lost); // Update the specific QR code status
      getQrCodesWithOutSearch(page, searchQuery); // Refresh the QR codes list with the correct parameters
    } catch (error) {
      toast.error(error.response.data.resultMessage.en, { duration: 5000 });
    }
  };
  const handleEdit = () => {
    navigate(`/edit-qr-code/${qrCodeData?.qr_planet_id}`, { state: { qrCodeData } });
  };

  return (
    <div className="qr-code-card" >
        <img 
          src={ qrCodeData.image_url || DefaultQRCode} 
          alt={qrCodeData?.name || "QR Code"} 
          className="qr-code-image" 
        />
      <h5 style={{ fontSize: "14.23px", color: "#183E51", marginTop: "6px", fontWeight: "500" }}>{qrCodeData?.name}</h5>
      <div className="edit-detail">
        <MdEdit onClick={handleEdit} />
      </div>
      <div className={`switch-container ${qrCodeData?.is_lost ? "switch-on" : ""}`}>
        <span className="lost-mode-text">Lost Mode</span>
        <div className="toggle-container" onClick={() => handleOpen(qrCodeData?.qr_planet_id)}>
          <div className={`toggle-button ${qrCodeData?.is_lost ? "active" : ""}`}></div>
        </div>
      </div>
      <EnableQRCode handleClose={handleClose} openModal={qrcode === qrCodeData?.qr_planet_id} closeModal={() => handleTurnOn(qrCodeData?.qr_planet_id)} id={qrCodeData?._id} is_lost={qrCodeData?.is_lost} />
    </div>
  );
};

export default QrCodeCard;
