import React, { useState } from "react";
import "../../styles/qr-code/qr-code.scss";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import EnableQRCode from "../enable-qrcode/enable-qrcode";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";


const QrCodeCard = ({ qrCodeData, fetchQrCodes, page, searchQuery, updateQrCodeStatus }) => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);

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

  const handleClose = () => setQRcode(null);

  const handleTurnOn = async (qr_planet_id) => {
    const token = Cookies.get("accessToken");
    const url = process.env.REACT_APP_PRODUCTION_URL;

    try {
      const response = await axios.put(`${url}/api/qrcode/change-status`, { code: qr_planet_id }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      handleClose();
      updateQrCodeStatus(qr_planet_id, !qrCodeData.is_lost); // Update the specific QR code status
      fetchQrCodes(page, searchQuery); // Refresh the QR codes list with the correct parameters
    } catch (error) {
      toast.error(error.response.data.resultMessage.en, { duration: 5000 });
    }
  };

  return (
    <div className="qr-code-card">
      <img src={qrCodeData?.image_url} alt={qrCodeData.name} className="qr-code-image" />
      <h5 style={{ fontSize: "12px", color: "#1B3E51", marginTop: "6px", fontWeight: "640" }}>{qrCodeData?.name}</h5>
      <div className="edit-detail"><Link to="/edit-qr-code"><FaUserEdit /></Link></div>
      <div className="switch-container">
        <span className="lost-mode-text">Lost Mode</span>
        <div className="toggle-container" onClick={() => handleOpen(qrCodeData?.qr_planet_id)}>
          <div className={`toggle-button ${qrCodeData?.is_lost ? "active" : ""}`}></div>
        </div>
      </div>
      <EnableQRCode openModal={qrcode === qrCodeData?.qr_planet_id} closeModal={() => handleTurnOn(qrCodeData?.qr_planet_id)} id={qrCodeData?._id} is_lost={qrCodeData?.is_lost} />
    </div>
  );
};

export default QrCodeCard;
