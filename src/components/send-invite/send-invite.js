import React, {} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import '../../styles/send-invite/send-invite.scss';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi";

const SendInvite = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    
    formState: { errors },
  } = useForm();

const accessToken = Cookies.get("accessToken");

const navigate = useNavigate ()
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


  const onSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    try {
      const response = await axios.post(
        `${url}/api/user/send-invite-link`, {...data},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      reset();
      navigate('/')

    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
    }
  };

const handleClick = () =>{
  navigate('/')
}
  return (
    <div className="send-invite-main-container"> 
    <div className="send-invite-form">
    <div className="menu-back" style={{marginRight:'220px'}}>
      <BiArrowBack  onClick={handleClick} style={{fontSize:"20px",color:"#ffff"}}/>
    </div>
    <div>
     <form onSubmit={handleSubmit(onSubmit)}  >
     <h1 style={{textAlign:"center"}}>Send Invite</h1>

       <div className="form-group-reg password-container">
         <input
           className="input-box"
           type="text"
           id="name"
           {...register('name', {
             required: 'Name is required',
             pattern: {
             },
           })}
           placeholder="Name"
         />
      {errors.name && <span className="error">{errors.name.message}</span>}
       </div>
       <div className={`password-container form-group ${errors.password ? "with-error" : ""}`}>
         <input
           className="input-box"
           type="email"
           id="email"
           {...register('email', {
             required: 'Email is required',
             validate: value => value === watch('email') ,
             pattern: {
               value: emailRegex,
               message: "Invalid email address",
             },
           })}
           placeholder="Email"
         />
         
         {errors.email && <span className="error">{errors.email.message}</span>}
       </div>
       <button className="button" type="submit">
         Submit
       </button>
     </form>
    </div>
         
      </div>
    </div>
  
  );
};

export default SendInvite