import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import "../../styles/qr-code-scanner/qr-code-scanner.scss";

const EnableQRCode = ({
  className,
  handleDelete,
  showSecondarybtn,
  closeModal,
  openModal,
  heading,
  text,
  onConfirm,
  id,
  handleClose,
  buttonText,
  userId,
}) => {
  const handleButtonClick = () => {
    if (buttonText === "Delete" ) {
      onConfirm()
    
    }
    else if(buttonText==="Yes"){
      handleDelete(userId)
    }
    closeModal(id);
  };

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      id="modal-title"
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <div className={`box-container ${className}`}>
        <h3>{heading || "Turn on Lost Mode?"}</h3>
        <p>{text || "Your contact information and message will be shared"}</p>
        <div className="btn-wrapper">
          <button onClick={handleButtonClick} className="cta-button" type="button">
            {buttonText || "Turn On"}
          </button>
          {showSecondarybtn && (
            <button onClick={handleClose} className="cta-button no-btn">
              No
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EnableQRCode;
