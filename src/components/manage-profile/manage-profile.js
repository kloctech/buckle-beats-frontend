import React, { useEffect, useState, useCallback } from "react";
import "../../styles/manage-profile/manage-profile.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "../../middleware/api";
import { FiMinusCircle } from "react-icons/fi";
import EnableQRCode from "../enable-qrcode/enable-qrcode";

const ManageProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const accessToken = Cookies.get("accessToken");
  const url = process.env.REACT_APP_PRODUCTION_URL; // Ensure this is defined in your environment variables
  const navigate = useNavigate();

  const onClickLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCTION_URL}/api/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        toast.success("Successfully logout");
        window.location.href = "/login";
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {}
  };

  const getProfiles = useCallback(async () => {
    try {
      const response = await api.get(`${url}/api/user/profiles`);
      setProfiles(response?.data?.profiles);
    } catch (error) {
      toast.error("Failed to fetch profiles");
    }
  }, [url]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const accessTokenExpirationTime = 1;

  const handleDeleteProfile = () => {
    setDeleteProfile(true);
  };

  const handleClick = (userId) => {
    if (deleteProfile) {
      setShowPopup(userId);
    } else {
      Cookies.set("userId", userId, { expires: accessTokenExpirationTime });
      navigate("/");
    }
  };

  const handleInviteLink = () => {
    navigate("/send-invite");
  };

  const handleClose = () => {
    setShowPopup(null);
    setDeleteProfile(false);
  };

  const handleDelete = async (userId) => {
    try {
     const response= await api.delete(`${url}/api/user/co-owner/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      getProfiles(); // Refresh profiles list
    } catch (error) {
      toast.error(error.response.data.resultMessage.en);
    }
  };

  return (
    <div className="login-container">
      <div className="manage-profile">
        <h1>Switch Profile</h1>
        <Link to="/" className="close-menu">
          X
        </Link>
        <ul className="manage-profile-list">
          {profiles.map((item) => (
            <li key={item._id} onClick={() => handleClick(item._id)}>
              <div className="manage-profile-bg">
                <span>{item.name.charAt(0)}</span>
                {item.is_owner === false && deleteProfile && (
                  <div className="manage-profile-icon">
                    <FiMinusCircle />
                  </div>
                )}
              </div>
              <h4>{item.name}</h4>
            </li>
          ))}
          <li className="invite" onClick={handleInviteLink}>
            <div className="manage-profile-bg">
              <span>Invite</span>
            </div>
          </li>
        </ul>
        <div className="manage-profile-wrapper">
          <button className="menu-logout" onClick={onClickLogout}>
            Sign Out
          </button>
          <button onClick={handleDeleteProfile} className="cta-button" style={{ backgroundColor: '#58d7b5' }}>
            Manage Profile
          </button>
        </div>
      </div>
      {showPopup && (
        <EnableQRCode
          className="manage-profile-modal"
          handleDelete={handleDelete}
          closeModal={setShowPopup}
          openModal={!!showPopup}
          heading="Are you sure you want to delete?"
          buttonText="Yes"
          showSecondarybtn
          handleClose={handleClose}
          userId={showPopup}
        />
      )}
    </div>
  );
};

export default ManageProfile;
