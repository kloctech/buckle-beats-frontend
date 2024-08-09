import React,{useState} from "react";
import axios from "axios";
import '../../styles/linking-co-owner/linking-co-owner.scss';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BuckleBeats from '../../assets/logo.png';
import { CircularProgress } from "@mui/material";

const LinkingCoowner = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ownertoken = searchParams.get("owner-token");
  const coownertoken = searchParams.get("co-owner-token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickCoowner = async () => {
    setLoading(true)
    const data = {
      ownerToken: ownertoken,
      coOwnerToken: coownertoken
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/user/link-co-owner`, data);
      toast.success(response?.data?.resultMessage?.en);
      setLoading(false)
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.resultMessage?.en);
      setLoading(false)
      console.error(error);
    }
  };


  return (
    <div className="main-container">
      <img className="logo" src={BuckleBeats} alt="BuckleBeats" />
      <div className="content-container">
        {ownertoken && coownertoken ? (
          <button className="accept-button next-btn"onClick={handleClickCoowner}>
         {loading ? <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} /> : "Accept"}
          </button>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LinkingCoowner;
