
import React, { useEffect, useState, useCallback, useRef } from "react";
import "../../styles/qr-code/qr-code.scss";
import Cookies from "js-cookie";
import axios from "axios";
import QrCodeCard from "../qr-code-card/qr-code-card";
import NoDataIcon from "../../assets/no-data-found.png";
import { useNavigate } from "react-router-dom";

const QrCodes = ({ searchInput }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const itemListRef = useRef(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const scrollThreshold = 50;
  const [isEmptyResult, setIsEmptyResult] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
      setPage(1);
      setIsEmptyResult(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const fetchQrCodes = useCallback(
    async (page, searchQuery) => {
      const url = process.env.REACT_APP_PRODUCTION_URL;
      const token = Cookies.get("accessToken");

      try {
        setLoading(true);
        const response = await axios.get(`${url}/api/qrcode?name=${searchQuery}&page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (response.data.qrCodes.length === 0) {
          setIsEmptyResult(true);
        }

        if (page === 1) {
          setQrCodes(response.data.qrCodes);
        } else {
          setQrCodes((prevQrCodes) => [...prevQrCodes, ...response.data.qrCodes]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchQrCodes(1, debouncedSearchInput);
  }, [debouncedSearchInput, fetchQrCodes]);

  const handleScroll = useCallback(() => {
    const itemList = itemListRef.current;
    const currentScrollTop = itemList.scrollTop;

    if (currentScrollTop > prevScrollTop && itemList.scrollHeight - itemList.scrollTop - itemList.clientHeight <= scrollThreshold && !loading && !isEmptyResult) {
      setPage((prevPage) => prevPage + 1);
    }

    setPrevScrollTop(currentScrollTop);
  }, [loading, prevScrollTop, scrollThreshold, isEmptyResult]);

  useEffect(() => {
    const itemList = itemListRef.current;
    itemList.addEventListener("scroll", handleScroll);
    return () => itemList.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (page > 1) {
      fetchQrCodes(page, debouncedSearchInput);
    }
  }, [page, debouncedSearchInput, fetchQrCodes]);

  const updateQrCodeStatus = (qr_planet_id, is_lost) => {
    setQrCodes((prevQrCodes) => prevQrCodes.map((qrCode) => (qrCode.qr_planet_id === qr_planet_id ? { ...qrCode, is_lost } : qrCode)));
  };
const handleClick = () =>{
  navigate('/qr-scanner')
}
  return (
    <div className="app">
      <div className={`qr-codes-container ${qrCodes.length === 0 ? "no-qr-codes" : ""}`} ref={itemListRef}>
        {" "}
        {qrCodes?.length === 0 ? (
          <div style={{ marginTop: "30vh", marginLeft: "0px" }}>
            <img src={NoDataIcon} alt="no-data-found" className="no-data-image" />
            <h1>No data found</h1>
          </div>
        ) : (
          qrCodes.map((item) => <QrCodeCard key={item._id} qrCodeData={item} fetchQrCodes={fetchQrCodes} page={page} searchQuery={debouncedSearchInput} updateQrCodeStatus={updateQrCodeStatus} />)
        )}
      </div>
      {loading && <div>Loading more items...</div>}
      <div className="footer-buttons">
        <button className="shop-button">Shop Now</button>
        <button className="activate-qr-button" onClick={handleClick}>Activate QR</button>
      </div>
    </div>
  );
};

export default QrCodes;
