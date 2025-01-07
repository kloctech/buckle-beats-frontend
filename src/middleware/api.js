
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
     config.headers["ngrok-skip-browser-warning"]= '6024';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.status)
    if (error.response && (error.response.status === 401)) {
      Cookies.remove("accessToken");

        window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
