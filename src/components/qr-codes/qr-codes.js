import React, { useEffect, useState, useCallback, useRef } from "react";
import "../../styles/qr-code/qr-code.scss";
import Cookies from "js-cookie";
import axios from "axios";
import QrCodeCard from "../qr-code-card/qr-code-card";
import NoDataIcon from "../../assets/no-data-found.png"

const QrCodes = ({ searchInput }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const itemListRef = useRef(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const scrollThreshold = 1;
  // const [emptyApiResult, setEmptyApiResult] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const fetchQrCodes = useCallback(
    async (pageNum, searchQuery) => {
      const url = process.env.REACT_APP_PRODUCTION_URL;
      const token = Cookies.get("accessToken");

      try {
        setLoading(true);
        const response = await axios.get(`${url}/api/qrcode?name=${searchQuery}&page=${pageNum}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // if (response.data.qrCodes.length === 0) {
        //   setEmptyApiResult(false);
        // }

        if (pageNum === 1) {
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

    if (currentScrollTop > prevScrollTop && itemList.scrollHeight - itemList.scrollTop - itemList.clientHeight <= scrollThreshold && !loading) {
      setPage((prevPage) => prevPage + 1);
    }

    setPrevScrollTop(currentScrollTop);
  }, [loading, prevScrollTop, scrollThreshold]);

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

  return (
    <div className="app">
      <div className="qr-codes-container" ref={itemListRef}>
        {qrCodes?.length === 0 ? (   
          <div className="no-data-container">
            <div className="no-data-image">
            <img src={NoDataIcon} alt="no-data Icon" />
            </div>
            <h1>No QR Code found</h1>      
          </div>
        ) : (
          qrCodes.map((item) => <QrCodeCard key={item._id} qrCodeData={item} fetchQrCodes={fetchQrCodes} />)
        )}
      </div>
      {loading && <div>Loading more items...</div>}
      <div className="footer-buttons">
        <button className="shop-button">Shop Now</button>
        <button className="activate-qr-button">Activate QR</button>
      </div>
    </div>
  );
};

export default QrCodes;
