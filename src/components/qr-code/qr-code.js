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

import React, { useState } from 'react';
import '../../styles/qr-code/qr-code.scss'
import bag from '../../assets/bag.gif'
import bagpic from '../../assets/bag1.jpeg'
import EnableQRCode from '../enable-qrcode/enable-qrcode';

const items = [
  { id: 1, name: 'BAG', image: bagpic, lost: false },
  { id: 2, name: 'PHONE', image: bagpic, lost: false },
  { id: 3, name: 'BICYCLE', image: bag, lost: false },
  { id: 4, name: 'KEYS', image: bag, lost: false },
  { id: 5, name: 'PASSPORT', image: bag, lost: false },
  { id: 6, name: 'WALLET', image: bag, lost: false },
  { id: 1, name: 'BAG', image: bagpic, lost: false },
  { id: 2, name: 'PHONE', image: bagpic, lost: false },
  { id: 3, name: 'BICYCLE', image: bag, lost: false },
  { id: 4, name: 'KEYS', image: bag, lost: false },
  { id: 5, name: 'PASSPORT', image: bag, lost: false },
  { id: 6, name: 'WALLET', image: bag, lost: false },


];
const ItemCard = ({ item }) => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const handleOpen = (id) => {
    if (activeId !== id) {
      setQRcode(id);
      setActiveId(null);
    }else{
      setQRcode(null);
      setActiveId(null);
    }   
  }
  const handleClose = () => {
    setQRcode(null);
  };

  const handleTurnOn = (id) => {
    setActiveId(id); 
    handleClose();
  };
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <h5 style={{ fontSize: '12px', color: '#1B3E51', marginTop: "6px", fontWeight: '640' }}>{item.name}</h5>
      <div className='switch-container'>
        <span className="lost-mode-text">{item.lost ? 'Lost Mode' : 'Lost Mode'}</span>
        <div className="toggle-container" onClick={() => handleOpen(item.id)}>
          <div className={`toggle-button ${activeId === item.id  ? 'active' : ''}`}></div>
        </div>
      </div>
      <EnableQRCode openModal={qrcode === item.id} closeModal={() => handleTurnOn(item.id)} id={item.id} />
    </div>
  )
};





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
