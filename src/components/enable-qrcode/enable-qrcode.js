import React from "react";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';

const EnableQRCode = ({closeModal, openModal , heading, text, id, handleClose ,qr_planet_id,is_lost}) => {
  return (
    
    <Modal
    open={openModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    onClose={handleClose}
    closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
    >
      <div className="box-container">
        <h3>{heading || "Turn on Lost Mode?"}</h3>
        <p>{text || "Your contact information and  message will be shared"}</p>
        <button onClick={() => closeModal(id)} className="cta-button" type="submit">
            Turn On
          </button>
      </div>
    </Modal>
  );
};

export default EnableQRCode;
