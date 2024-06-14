import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";
import EnableQRCode from "../enable-qrcode/enable-qrcode";

const EditQRCode = () => {
    const [qrcode, setQRcode] = useState(null);
    const [activeId, setActiveId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitAddQRForm = async (data) => {
    console.log(data)
  }
  const handleOpen = async (id) => {
      if (activeId !== id) {
        setQRcode(id);
        setActiveId(id);
      } else {
        setQRcode(null);
        setActiveId(null);
      }
  };

  const handleClose = () => {setQRcode(null);setActiveId(null);}
  return (
    <div className="login-main-container edit-qr">
      <div className="login-container"> 
        <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
        <h1>Edit QR Details</h1>
        <div className="form-group-login name-group">
          <input     
              id="name"
              name="name"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: "Invalid name",
                },
              })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group-login email-group">
          <input     
              id="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="form-group-login mobile-group">
          <select>
              <option value="+44" >+44</option>
              <option value="+1">+1</option>
              <option value="+971">+971</option>
            </select>  
              <input
              id="mobile"
              placeholder="Mobile"
              {...register("mobile", {
                required: false,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
            />
          {errors.mobile && <span className="error-message">{errors.mobile.message}</span>}
          </div>
          <div className="form-group-login select-group"> 
            <select {...register("category", {
            required: false
           })}>
              <option value="" disabled selected>Category</option>
              <option value="A">Category A</option>
              <option value="B">Category B</option>
            </select>       
         </div>
         <div className="add-qr-box">
              <p>Hi there! If you find my passport, please contact me or send me an email. Thank you so much..</p>
            </div>
         <div className="button-row"> 
          <button onClick={() => handleOpen("test")} className="cta-button delete-btn">Delete</button>
           <button className="cta-button edit-btn">Edit</button>
          </div>
        </form>
      </div>
      <EnableQRCode handleClose={handleClose} openModal={qrcode === "test"} closeModal={() => handleOpen("test")} id="test" 
        heading="QR Deletion" text={`Delete this QR code is permanent. Confirm action?`} buttonText="Delete" />
    </div>
  );
};
export default EditQRCode;