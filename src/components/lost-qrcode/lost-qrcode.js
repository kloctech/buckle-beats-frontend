
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
import location from '../../assets/location.gif'
import heart from '../../assets/done_heart.gif'
import LocationShare from "../location-share/location-share";
const LostQRCode = () => {
  const [lostData, setLostdata] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false); // State to handle the loading screen
  const [locationShared, setLocationShared] = useState(false); // State to handle success screen
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const onSubmitForm = async (formData) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    try {
      const response = await axios.post(`${url}/api/user/send-message`, {
        code: id,
        message: formData?.message
      });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en || "Failed to send message", { duration: 5000 });
    }
  };

  useEffect(() => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/qrcode/owner-details/${id}`);
        if (isMounted) {
          setLostdata(response.data);
          toast.success(response.data.resultMessage.en, { duration: 5000 });
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setSharingLocation(true); // Show loading screen
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = process.env.REACT_APP_PRODUCTION_URL;
          axios.post(`${url}/api/user/share-location`, {
            code: id,
            lat: latitude,
            lng: longitude,
          })
          .then(response => {
            setSharingLocation(false); 
            setLocationShared(true);
            toast.success(response.data.resultMessage.en, { duration: 5000 });
          })
          .catch(error => {
            toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
            setSharingLocation(false); 
          });
        },
        (error) => {
          toast.error("Failed to get location. Please enable location services.", { duration: 5000 });
          setSharingLocation(false); // Hide loading screen on error
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.", { duration: 5000 });
    }
  };
  

  return (
    <>
      {sharingLocation ? (
      <LocationShare icon={location} showQrCodeIcon={true}  sharingLocation ={sharingLocation}/>
      ) : locationShared ? (
        <LocationShare  icon={heart}  locationShared = {locationShared}  showQrCodeIcon={false} className ="form-desktop-icon"/>
      ) : (
        lostData !== null && (
          <div className="lostqrcode-container">

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
                    placeholder="Leave a note here, your contact details or mentions if you've left the item at Lost and Found reception. This helps the owner recover it more easily. Thank you!."
                    {...register("message", { required: "Please enter the message" })}
                  />
                  {errors.message && <span style={{color:'rgb(250, 111, 104)' }}>{errors.message.message}</span>}
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
                  {isMobile ? (
                    <a
                      className="contact-link"
                      style={{ textDecoration: "none" }}
                      href={`mailto:${lostData.owner.email}`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <img src={EmailIcon} alt="Email Icon" />
                      <span>{lostData.owner.email}</span>
                    </a>
                  ) : (
                    <a
                      className="contact-link"
                      style={{ textDecoration: "none" }}
                      href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=${lostData.owner.email}`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      <img src={EmailIcon} alt="Email Icon" />
                      <span>{lostData.owner.email}</span>
                    </a>
                  )}
                </li>
              )}
              {lostData.owner.mobileNumber && (
                <li>
                  <a 
                    style={{ textDecoration: "none" }}
                    className="contact-link"
                    href={`tel:${lostData.owner.mobileNumber}`}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <img src={PhoneIcon} alt="Phone Icon" />
                    <span>{lostData.owner.mobileNumber}</span>
                  </a>
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
                  <p>If possible, proceed to the nearest Lost and Found reception and consent to share the location. Your proactive kindness truly makes a difference and strengthens truly our caring community.</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="share-button" onClick={handleGetLocation}>
                      <img src={sharelocation} alt="location" /> Share location
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        )
      )}
    </>
  );
};

export default LostQRCode;
