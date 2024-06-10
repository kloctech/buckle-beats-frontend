import React, { useEffect, useState, useCallback } from 'react';
import '../../styles/qr-code/qr-code.scss';
import Cookies from "js-cookie";
import axios from 'axios';

const ItemCard = ({ item, onToggle }) => (
  <div className="item-card">
    <img src={item?.qr_code_url} alt={item.name} className="item-image" />
    <h5 style={{ fontSize: '12px', color: '#1B3E51', marginTop: "6px", fontWeight: '640' }}>{item.name}</h5>
    <div className='switch-container'>
      <span className="lost-mode-text">{item?.is_lost ? 'Lost Mode' : 'Lost Mode'}</span>
      <div className="toggle-container" onClick={() => onToggle(item.id)}>
        <div className={`toggle-button ${item?.lost ? 'active' : ''}`}></div>
      </div>
    </div>
  </div>
);

const QrCode = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(false);

  const fetchQrCodes = useCallback(async (pageNum) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    const token = Cookies.get("accessToken");

    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/api/qrcode?name=${name}&page=${pageNum}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response)
      setQrCodes(response?.data?.qrCodes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching QR codes:", error);
      setLoading(false);
    }
  }, [name, limit]);

  useEffect(() => {
    fetchQrCodes(page);
  }, [fetchQrCodes, page]);

  const handleToggle = (id) => {
    const updatedItems = qrCodes.map(item =>
      item.id === id ? { ...item, lost: !item.is_lost } : item
    );
    setQrCodes(updatedItems);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);
console.log(page,limit)
  return (
    <div className="app">
      <div className="item-list">
        {qrCodes.map(item => (
          <ItemCard key={item.id} item={item} onToggle={handleToggle} />
        ))}
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
