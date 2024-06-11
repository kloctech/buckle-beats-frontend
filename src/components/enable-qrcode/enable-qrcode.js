import React from "react";
import Modal from '@mui/material/Modal';

const EnableQRCode = ({closeModal, openModal , heading, text, id,qr_planet_id,is_lost}) => {
  console.log(id)
  return (
    
    <Modal
    open={openModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <div class="box-container">
        <h3>{is_lost ?  "Turn off Lost Mode?" : "Turn on  Lost Mode?"}</h3>
        <p>{text || "Your contact information and  message will be shared"}</p>
        <button onClick={() => closeModal(id)} className="cta-button" type="submit">
            {is_lost ? "Turn off" :"Turn on"}
          </button>
      </div>
    </Modal>
  );
};

export default EnableQRCode;
