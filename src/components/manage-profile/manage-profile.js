import React from "react";
import "../../styles/manage-profile/manage-profile.scss";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const ManageProfile = () => {

    const onClickLogout = async () => {
        const accessToken = Cookies.get("accessToken");
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
        } catch (error) { }
    };
 const profiles = [
    {
        Name: "Alex"
    },
    {
        Name: "Silvi"
    },
    {
        Name: "Dixon"
    },
    {
        Name: "Harry"
    },
    {
        Name: "Alicia"
    }
 ]
    return (
       
            <div className="login-container">      
                <div className="manage-profile">
                <h1>Switch Profile</h1>
                <Link to="/" className="close-menu">X</Link>
                <ul className="manage-profile-list">
                {profiles.slice(0, 5).map((item) =>{  
                    return(
                        <li key={item.Name}>
                        <div className="manage-profile-bg">
                        <span>{item.Name.charAt(0)}</span>
                        </div>
                        <h4>{item.Name}</h4>
                      </li>
                    )    
                  })}
                  <li class="invite">
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