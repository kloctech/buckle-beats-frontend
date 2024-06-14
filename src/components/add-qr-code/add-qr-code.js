import React from "react";
import { useForm } from "react-hook-form";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";

const AddQRCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitAddQRForm = async (data) => {
    console.log(data)
  }
  return (
    <div className="login-main-container add-qr">
      <div className="login-container"> 
        <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
        <h1>Add QR Details</h1>
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
              <option value="+1">+1</option>>
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
              <p>Leave a note here, such as allergy information or care instructions. If your item is lost, this will help the finder take 
              proper care of it and ensure its safe return.</p>
            </div>
         <button className="login-button save-btn">
                Save
            </button>
        </form>
      </div>
    </div>
  );
};
export default AddQRCode;
