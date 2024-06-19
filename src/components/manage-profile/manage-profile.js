import React, { useEffect, useState } from "react";
import "../../styles/manage-profile/manage-profile.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";

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
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getProfiles = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profiles`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfiles(response?.data?.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error("Failed to fetch profiles");
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  const handleClick = (id) => {
    console.log(id);
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="manage-profile">
        <h1>Switch Profile</h1>
        <Link to="/" className="close-menu">X</Link>
        <ul className="manage-profile-list">
          {profiles1?.map((item) => (
            <li key={item._id} onClick={() => handleClick(item._id)}>
              <div className="manage-profile-bg">
                <span>{item.name.charAt(0)}</span>
              </div>
              <h4>{item.name}</h4>
            </li>
          ))}
          <li className="invite">
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
