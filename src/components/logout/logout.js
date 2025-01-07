import React from "react";
import Cookies from "js-cookie";

import "../../styles/logout/logout.scss";

const Logout = () => {
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

        window.location.href = "/signin";
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <button className="fixed-logout-button " style={{ backgroundColor: "#183E51", color: "white", textAlign: "center" }} onClick={onClickLogout}>
        logout
      </button>
    </div>
  );
};

export default Logout;
