import React from "react";
import axios from "axios";
import '../../styles/linking-co-owner/linking-co-owner.scss';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BuckleBeats from '../../assets/logo.png';

const LinkingCoowner = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ownertoken = searchParams.get("owner-token");
  const coownertoken = searchParams.get("co-owner-token");
  const navigate = useNavigate();

  const handleClickCoowner = async () => {
    const data = {
      ownerToken: ownertoken,
      coOwnerToken: coownertoken
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/user/link-co-owner`, data);
      toast.success(response?.data?.resultMessage?.en);
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.resultMessage?.en);
      console.error(error);
    }
  };

  console.log(ownertoken, coownertoken);

  return (
    <div className="main-container">
      <img className="logo" src={BuckleBeats} alt="BuckleBeats" />
      <div className="content-container">
        {ownertoken && coownertoken ? (
          <button className="accept-button next-btn"onClick={handleClickCoowner}>
            Accept
          </button>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LinkingCoowner;
