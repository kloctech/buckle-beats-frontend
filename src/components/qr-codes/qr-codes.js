
import React, { useEffect, useState, useCallback, useRef } from "react";
import "../../styles/qr-code/qr-code.scss";
import Cookies from "js-cookie";
import api from "../../middleware/api";
import QrCodeCard from "../qr-code-card/qr-code-card";
import NoDataIcon from "../../assets/no-data-found.png";
import { useLocation, useNavigate } from "react-router-dom";

const QrCodes = ({ searchInput }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const itemListRef = useRef(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const scrollThreshold = 1;
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Line 16: Flag to stop further API calls when no more results

  const location = useLocation();
  const userId = location.state?.userId || Cookies.get("userId");

  const loadMoreButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
      setPage(1); 
      setIsEmptyResult(false);
      setHasMore(true); 
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

 console.log(isEmptyResult)
  const getQrCodesWithOutSearch = useCallback(
    async (page = 1) => {
      if (!hasMore) return; 
      const url = process.env.REACT_APP_PRODUCTION_URL;

      try {
        setLoading(true);
        const response = await api.get(`${url}/api/qrcode/${userId}?page=${page}&limit=${limit}`);

        const qrCodesData = response.data.qrCodes;
        if (qrCodesData.length === 0 && page > 1) {
          setHasMore(false); 
          return;
        }

        if (page === 1) {
          setQrCodes(qrCodesData);
        } else {
          setQrCodes((prevQrCodes) => [...prevQrCodes, ...qrCodesData]);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
    [limit, userId, hasMore]
  );

  
  const fetchQrCodes = useCallback(
    async (page, searchQuery) => {
      if (!hasMore) return; 
      const url = process.env.REACT_APP_PRODUCTION_URL;

      try {
        setLoading(true);
        const response = await api.get(`${url}/api/qrcode/search?name=${searchQuery}&page=${page}&limit=${limit}`);

        const qrCodesData = response.data.qrCodes;
        if (qrCodesData.length === 0 && page > 1) {
          setHasMore(false); 
          return;
        }

        if (page === 1) {
          setQrCodes(qrCodesData);
        } else {
          setQrCodes((prevQrCodes) => [...prevQrCodes, ...qrCodesData]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
        setLoading(false);
      }
    },
    [limit, hasMore]
  );

  
  useEffect(() => {
    if (debouncedSearchInput) {
      fetchQrCodes(1, debouncedSearchInput);
    } else {
      getQrCodesWithOutSearch(1);
    }
  }, [debouncedSearchInput, fetchQrCodes, getQrCodesWithOutSearch]);

  const handleScroll = useCallback(() => {
    const itemList = itemListRef.current;
    const currentScrollTop = itemList.scrollTop;

    if (currentScrollTop > prevScrollTop && itemList.scrollHeight - itemList.scrollTop - itemList.clientHeight <= scrollThreshold && !loading && hasMore) { // Line 110: Stop incrementing page if no more results
      setPage((prevPage) => prevPage + 1);
    }

    setPrevScrollTop(currentScrollTop);
  }, [loading, prevScrollTop, scrollThreshold, hasMore]);

  useEffect(() => {
    const itemList = itemListRef.current;
    itemList.addEventListener("scroll", handleScroll);
    return () => itemList.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

 
  useEffect(() => {
    if (page > 1 && hasMore) { 
      if (debouncedSearchInput) {
        fetchQrCodes(page, debouncedSearchInput);
      } else {
        getQrCodesWithOutSearch(page);
      }
    }
  }, [page, debouncedSearchInput, fetchQrCodes, getQrCodesWithOutSearch, hasMore]);

  const updateQrCodeStatus = (qr_planet_id, is_lost) => {
    setQrCodes((prevQrCodes) => prevQrCodes.map((qrCode) => (qrCode.qr_planet_id === qr_planet_id ? { ...qrCode, is_lost } : qrCode)));
  };

  const handleClick = () => {
    navigate("/qr-scanner");
  };

  const OnClickLoadMore = () => {
    const contentElement = itemListRef.current;

    if (contentElement) {
      contentElement.scroll({
        top: contentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="app">
        <div className={`qr-codes-container ${qrCodes.length === 0 ? "no-qr-codes" : ""}`} ref={itemListRef}>
          {qrCodes?.length === 0 ? (
            <div className="no-qr-code-wrapper" style={{ marginTop: "24vh", marginLeft: "0px" }}>
              <img src={NoDataIcon} alt="no-data-found" className="no-data-image" />
              <h1>QR codes not found</h1>
            </div>
          ) : (
            qrCodes.map((item) => <QrCodeCard key={item._id} qrCodeData={item} getQrCodesWithOutSearch={getQrCodesWithOutSearch} page={page} searchQuery={debouncedSearchInput} updateQrCodeStatus={updateQrCodeStatus} />)
          )}
        </div>

        {qrCodes.length >= limit && hasMore && (
          <p ref={loadMoreButtonRef} onClick={OnClickLoadMore} className="load-more">
            Load more
          </p>
        )}
        {loading && <div>Loading more items...</div>}
      </div>
      <div className="footer-buttons">
        <button className="shop-button">Shop Now</button>
        <button className="activate-qr-button" onClick={handleClick}>
          Activate QR
        </button>
      </div>
    </div>
  );
};

export default QrCodes;
