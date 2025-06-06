import React, { useState, useEffect, useRef } from "react";
import "../../styles/lost-qrcode/lost-qrcode.scss";
import Logo from "../../assets/roam tracker logo.svg"
import PhoneIcon from "../../assets/phone.png";
import EmailIcon from "../../assets/email.png";
import UserIcon from "../../assets/user.png";
import sharelocation from '../../assets/location Icon.svg';
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import location from '../../assets/location.gif';
import heart from '../../assets/done_heart.gif';
import LocationShare from "../location-share/location-share";
import { FaCheckCircle } from "react-icons/fa";

const LostQRCode = () => {
  const [lostData, setLostdata] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0); // State for countdown
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const hasScanned = useRef(false);

  // Function to get device and OS information
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let device = "desktop";
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      device = "tablet";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      device = "mobile";
    }
    return {
      device,
      os: navigator.platform
    };
  };

  useEffect(() => {
    if (hasScanned.current) return; // Skip if we've already scanned
    
    const scanQRCode = async () => {
      try {
        hasScanned.current = true; // Mark as scanned before making the request
        const url = process.env.REACT_APP_PRODUCTION_URL;
        const deviceInfo = getDeviceInfo();
        
        // Get geolocation if available
        let locationData = {};
        if (navigator.geolocation) {
          try {
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            locationData = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          } catch (error) {
            console.log('Location access denied or error:', error);
          }
        }

        const scanData = {
          ...locationData,
          timestamp: new Date().toISOString(),
          code: id,
          redirects: 1,
          device: deviceInfo.device,
          os: deviceInfo.os,
          country: Intl.DateTimeFormat().resolvedOptions().timeZone // Using timezone as a rough estimate of country
        };
        
        const response = await axios.post(`${url}/api/qrcode/scan`, scanData);
        console.log('TRIGGRED')
        console.log('Scan recorded:', response.data);
      } catch (error) {
        console.error('Error recording scan:', error);
      }
    };

    scanQRCode();
  }, [id]); // Run when component mounts and when id changes

  // Function to format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const lastSentTime = localStorage.getItem('lastSentTime');
    if (lastSentTime) {
      const cooldownEndTime = parseInt(lastSentTime, 10) + 5 * 60 * 1000; // 5 minutes cooldown end time
      const currentTime = Date.now();
      const timeLeft = cooldownEndTime - currentTime;

      if (timeLeft > 0) {
        setCanSendMessage(false);
        setRemainingTime(timeLeft);

        const timer = setInterval(() => {
          setRemainingTime(prevTime => {
            if (prevTime <= 1000) {
              clearInterval(timer);
              setCanSendMessage(true);
              localStorage.removeItem('lastSentTime');
              return 0;
            }
            return prevTime - 1000;
          });
        }, 1000);

        return () => clearInterval(timer); 
      } else {
        setCanSendMessage(true);
        localStorage.removeItem('lastSentTime');
      }
    }
  }, [remainingTime]);

  const onSubmitForm = async (formData) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    try {
      const response = await axios.post(`${url}/api/user/send-message`, {
        code: id,
        message: formData?.message
      });

      const now = Date.now();
      const cooldownEndTime = now + 5 * 60 * 1000; 
      localStorage.setItem('lastSentTime', now);
      setCanSendMessage(false);
      setRemainingTime(cooldownEndTime - now);

      toast.success(response.data.resultMessage.en, { duration: 5000 });
      reset();
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
      setSharingLocation(true);
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
          setSharingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.", { duration: 5000 });
    }
  };

  return (
    <>
      {sharingLocation ? (
        <LocationShare icon={location} showQrCodeIcon={true} sharingLocation={sharingLocation} />
      ) : locationShared ? (
        <LocationShare icon={heart} locationShared={locationShared} showQrCodeIcon={false} className="form-desktop-icon" />
      ) : (
        lostData !== null && (
          <div className="lostqrcode-container">
            <div className="lostqrcode-main-container">
              
                        {isMobile ? (
              <div className="lostqrcode-image">
                <img src={Logo} alt="BUKLEBEATS" />
              </div>
            ) : null}

              <h3 className="lostqrcode-title">Thank You for Your Kindness!</h3>
              <h4>This item has been lost.</h4>
              {!lostData?.owner?.qrIsLost ? (
                <>
                  <p>It seems this item hasn't been reported lost yet. The owner might not be aware it's missing.</p>
                  {canSendMessage && <p>Please use the message box below to alert them.</p>}
                </>
              ) : null}
              {lostData.owner.qrIsLost && (
                <div className="lostqrcode-box">
                  <p>{lostData.owner.defaultMessage}</p>
                </div>
              )}
              {!lostData?.owner?.qrIsLost && (
                <>
                  {!canSendMessage ? (
                    <div className="form-containers" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <FaCheckCircle className="verification-message" />
                      <p className="verify-message" style={{ color: "#E4E9F1" }}>
                        Message sent successfully. Please wait {formatTime(remainingTime)} before sending another message.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                      <div className="textarea-group">
                        <textarea
                          rows="3"
                          className="add-qr-box"
                          style={{ padding: "1rem" }}
                          name="message"
                          placeholder="Leave a note here, your contact details, or mention if you've left the item at Lost and Found reception. This helps the owner recover it more easily. Thank you!."
                          {...register("message", { required: "Please enter the message" })}
                        />
                        {errors.message && <span style={{ color: 'rgb(250, 111, 104)' }}>{errors.message.message}</span>}
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                        <button className="login-button" style={{ width: '60%' }}>Send</button>
                      </div>
                    </form>
                  )}
                </>
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
                      <img src={EmailIcon} alt="Email Icon" style={{filter:"brightness(0) saturate(100%) invert(97%) sepia(6%) saturate(7341%) hue-rotate(315deg) brightness(104%) contrast(95%);"}}/>
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
                    <p>You're doing more than finding a lost item. Each item at RoamSmartTracker holds a precious story, waiting to be continued with your help.</p>
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
          </div>
        )
      )}
    </>
  );
};

export default LostQRCode;


