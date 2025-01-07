import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      Cookies.remove("accessToken");
      navigate("/signin");
    }
  }, [navigate]);

  return <Outlet>{children}</Outlet>;
}

export default ProtectedRoute;
