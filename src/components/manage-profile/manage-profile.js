import React, { useEffect, useState, useCallback } from "react";
import "../../styles/manage-profile/manage-profile.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "../../middleware/api";

const ManageProfile = () => {
  const [profiles1, setProfiles] = useState([]);
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

  const handleClick = (userId) => {
    Cookies.set("userId", userId, { expires: accessTokenExpirationTime });
    navigate("/");
  };

  const handleInviteLink = () => {
    navigate("/send-invite");
  };

  return (
    <div className="login-container">
      <div className="manage-profile">
        <h1>Switch Profile</h1>
        <Link to="/" className="close-menu">
          X
        </Link>
        <ul className="manage-profile-list">
          {profiles1?.map((item) => (
            <li key={item._id} onClick={() => handleClick(item._id)}>
              <div className="manage-profile-bg">
                <span>{item.name.charAt(0)}</span>
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
          <Link to="/" className="shop-button">
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
