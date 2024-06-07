import React from "react";
import { Outlet } from "react-router-dom";
import Logout from "../logout/logout";

const WithLogoutButton = () => {
  return (
    <div>
      <Logout />
      <Outlet />
    </div>
  );
};

export default WithLogoutButton;
