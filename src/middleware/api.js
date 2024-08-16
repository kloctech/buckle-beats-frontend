
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      Cookies.remove("accessToken");

        window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
