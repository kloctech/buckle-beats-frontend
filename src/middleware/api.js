import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '6024'
  }
});

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
    if (error.response && error.response.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = '/signin';
    }
    // Handle CORS errors
    if (error.message?.includes('Network Error') || !error.response) {
      console.error('CORS or Network Error:', error);
    }
    return Promise.reject(error);
  }
);

export default api;
