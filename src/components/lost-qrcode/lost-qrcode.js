import React, { useState, useEffect } from "react";
import "../../styles/lost-qrcode/lost-qrcode.scss";
import Logo from "../../assets/logo.png";
import PhoneIcon from "../../assets/phone.png";
import EmailIcon from "../../assets/email.png";
import UserIcon from "../../assets/user.png";
import sharelocation from '../../assets/location Icon.svg';
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

const LostQRCode = () => {
  const [lostData, setLostdata] = useState(null);
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [coords, setCoords] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitForm = async (formData) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
   
    try {
      const response = await axios.post(`${url}/api/user/send-message`, {
       code:id,
       message:formData?.message
      });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en || "Failed to send message", { duration: 5000 });
    }
  };

  useEffect(() => {
    const url = process.env.REACT_APP_PRODUCTION_URL;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/qrcode/owner-details/${id}`);
        setTimeout(() => {
          setLostdata(response.data);
          toast.success(response.data.resultMessage.en, { duration: 5000 });
        }, 1000);
      } catch (error) {
        toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
      }
    };

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   if (coords) {
  //     const { latitude, longitude } = coords;
  //     axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
  //       .then(response => {
  //         if (response.data && response.data.display_name) {
  //           const address = response.data.display_name;
  //           setAddress(address);
  //         } else {
  //           toast.error('No address found for this location.');
  //         }
  //       })
  //       .catch(error => {
  //         toast.error('Error fetching address');
  //         console.error('Error fetching address:', error);
  //       });
  //   }
  // }, [coords]);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords(position.coords);
          toast.success('Location fetched successfully.');
        },
        (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              toast.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              toast.error('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              toast.error('An unknown error occurred.');
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };
console.log(coords)
  return (
    <div className="lostqrcode-container">
      {lostData !== null && (
        <div className="lostqrcode-main-container">
          <div className="lostqrcode-image">
            <img src={Logo} alt="BUKLEBEATS" />
          </div>

          <h3 className="lostqrcode-title">Thank You for Your Kindness!</h3>
          <h4>This item has been lost.</h4>
          {!lostData?.owner?.qrIsLost ? <p>It seems this item hasn't been reported lost yet. The owner might not be aware it's missing.</p> : null}
          {!lostData?.owner?.qrIsLost ? <p>Please use the message box below to alert them.</p> : null}

          {lostData.owner.qrIsLost && (
            <div className="lostqrcode-box">
              <p>{lostData.owner.defaultMessage}</p>
            </div>
          )}
          {!lostData?.owner?.qrIsLost && (
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="textarea-group">
                <textarea
                  rows="3"
                  className="add-qr-box"
                  style={{ padding: "1rem" }}
                  name="message"
                  placeholder="Leave a note here, such as allergy information or care instructions. If your item is lost, this will help the finder take proper care of it and ensure its safe return"
                  {...register("message", { required: "Please enter the message" })}
                />
                {errors.default_message && <span>{errors.default_message.message}</span>}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                <button className="login-button" style={{ width: '60%' }}>Send</button>
              </div>
            </form>
          )}

          <ul className="lostqrcode-list">
            {lostData.owner.name && (
              <li>
                <img src={UserIcon} alt="User Icon" />
                <span>{lostData.owner.name}</span>
              </li>
            )}
            {lostData.owner.email && (
              <li>
                <img src={EmailIcon} alt="Email Icon" />
                <span>{lostData.owner.email}</span>
              </li>
            )}
            {lostData.owner.mobileNumber && (
              <li>
                <img src={PhoneIcon} alt="Phone Icon" />
                <span>{lostData.owner.mobileNumber}</span>
              </li>
            )}
          </ul>

          <div className="lostqrcode-content">
            {lostData?.owner?.qrIsLost && (
              <div>
                <p>You’re doing more than finding a lost item. Each item at BuckleBeats holds a precious story, waiting to be continued with your help.</p>
                <p>Please consent to also sharing your location, and be a hero in this happy reunion. Your kindness truly makes a difference and strengthens our caring community.</p>
              </div>
            )}

            {!lostData?.owner?.qrIsLost && (
              <div>
                <p>If possible, proceed to the nearest Lost and Found reception and consent to share the location. Your proactive kindness truly makes a difference and strengthens our caring community.</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button className="share-button" onClick={handleGetLocation}>
                    <img src={sharelocation} alt="location" /> Share location
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LostQRCode;
