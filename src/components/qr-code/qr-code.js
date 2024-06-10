
import React, { useEffect, useState, useCallback } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';
import ItemCard from '../qr-code-card/qr-code-card';
import toast from 'react-hot-toast';
import '../../styles/qr-code/qr-code.scss';

const QrCode = ({ searchInput }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const fetchQrCodes = useCallback(async (pageNum, searchQuery) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    const token = Cookies.get("accessToken");

    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/api/qrcode?name=${searchQuery}&page=${pageNum}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (pageNum === 1) {
        setQrCodes(response.data.qrCodes);
      } else {
        setQrCodes(prevQrCodes => [...prevQrCodes, ...response.data.qrCodes]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching QR codes:", error);
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchQrCodes(1, '');
  }, [fetchQrCodes]);

  useEffect(() => {
    if (debouncedSearchInput.length >= 3 || debouncedSearchInput.length === 0) {
      // setPage(1); // Reset the page state when the search input changes
      fetchQrCodes(1, debouncedSearchInput);
    }
  }, [debouncedSearchInput, fetchQrCodes]);

  const handleTurnOn = async (id, qr_planet_id, handleClose) => {
    const token = Cookies.get("accessToken");
    const url = process.env.REACT_APP_PRODUCTION_URL;

    try {
      const response = await axios.put(
        `${url}/api/qrcode/change-status`,
        { code: qr_planet_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedItems = qrCodes.map(item =>
        item.id === id ? { ...item, is_lost: !item.is_lost } : item
      );
      setQrCodes(updatedItems);

      toast.success(response.data.resultMessage.en, { duration: 5000 });
      
      handleClose();
    } catch (error) {
      console.error('Error making API call:', error);
      toast.error(error.response.data.resultMessage.en, { duration: 5000 });
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    if ((debouncedSearchInput.length >= 3 || debouncedSearchInput.length === 0) && page > 1) {
      fetchQrCodes(page, debouncedSearchInput);
    }
  }, [page, debouncedSearchInput, fetchQrCodes]);

  useEffect(() => {
    if (debouncedSearchInput.length < 3) {
      setPage(1);
      fetchQrCodes(1, '');
    }
  }, [debouncedSearchInput, fetchQrCodes]);

  return (
    <div className="app">
      <div className="item-list">
        {qrCodes.length > 0 ? (
          qrCodes.map(item => (
            <ItemCard key={item.id} item={item} handleTurnOn={handleTurnOn} />
          ))
        ) : (
          <div>No data found</div>
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

export default QrCode;
