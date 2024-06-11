import React, { useEffect, useState, useCallback } from 'react';
import '../../styles/qr-code/qr-code.scss';
import Cookies from "js-cookie";
import axios from 'axios';
import EnableQRCode from '../enable-qrcode/enable-qrcode';
import toast from 'react-hot-toast';


const ItemCard = ({ item, fetchQrCodes }) => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const handleOpen = async (id) => {
    if (item.is_lost) {
      await handleTurnOn(id);
    } else {
      // Open the popup
      if (activeId !== id) {
        setQRcode(id);
        setActiveId(id);
      } else {
        setQRcode(null);
        setActiveId(null);
      }
    }
  };

  const handleClose = () => {
    setQRcode(null);
  };

  const handleTurnOn = async (qr_planet_id) => {
    const token = Cookies.get("accessToken");
    const url = process.env.REACT_APP_PRODUCTION_URL;

    try {
      const response = await axios.put(
        `${url}/api/qrcode/change-status`,
        { code: qr_planet_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      handleClose();
      fetchQrCodes(""); // Refresh the QR codes list
    } catch (error) {
      toast.error(error.response.data.resultMessage.en, { duration: 5000 });
    }
  };

  return (
    <div className="item-card">
      <img src={item?.image_url} alt={item.name} className="item-image" />
      <h5 style={{ fontSize: '12px', color: '#1B3E51', marginTop: "6px", fontWeight: '640' }}>{item.name}</h5>
      <div className="switch-container">
        <span className="lost-mode-text">{item.is_lost ? 'Lost Mode' : 'Lost Mode'}</span>
        <div className="toggle-container" onClick={() => handleOpen(item?.qr_planet_id)}>
          <div className={`toggle-button ${item.is_lost === true ? 'active' : ''}`}></div>
        </div>
      </div>
      <EnableQRCode openModal={qrcode === item.qr_planet_id} closeModal={() => handleTurnOn(item.qr_planet_id)} id={item.id} is_lost={item?.is_lost} />
    </div>
  );
};

const QrCode = ({ searchInput }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const fetchQrCodes = useCallback(async (searchQuery) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    const token = Cookies.get("accessToken");

    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/api/qrcode?name=${searchQuery}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setQrCodes(response.data.qrCodes);
    } catch (error) {
      console.error("Error fetching QR codes:", error);
      setLoading(false);
    }
  }, [page,limit]);

  useEffect(() => {
    if (debouncedSearchInput.length >= 3 ) {
      setPage(1); 
      fetchQrCodes(debouncedSearchInput);
    }
  }, [debouncedSearchInput, fetchQrCodes,page]);
  useEffect(() => {
    if ((debouncedSearchInput.length >= 3 || debouncedSearchInput.length === 0) && page > 1) {
      fetchQrCodes(debouncedSearchInput);
    }
  }, [page, debouncedSearchInput, fetchQrCodes]);

  useEffect(() => {
    if (debouncedSearchInput.length < 3) {
      fetchQrCodes('');
    }
  }, [debouncedSearchInput, fetchQrCodes,page]);

  return (
    <div className="app">
       <div className="item-list">
        {qrCodes?.length === 0  ? (
          <div className="no-data-container"><h1>No data found</h1></div>
        ) : (
          qrCodes.map((item) => <ItemCard key={item._id} item={item} fetchQrCodes= {fetchQrCodes} />)
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
