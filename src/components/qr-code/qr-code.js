<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from "react";
=======
import React, { useEffect, useState, useCallback, useRef } from "react";
>>>>>>> master
import "../../styles/qr-code/qr-code.scss";
import Cookies from "js-cookie";
import axios from "axios";
import EnableQRCode from "../enable-qrcode/enable-qrcode";
import toast from "react-hot-toast";

const ItemCard = ({ item }) => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const handleOpen = (id) => {
    if (activeId !== id) {
      setQRcode(id);
      setActiveId(id);
    } else {
      setQRcode(null);
      setActiveId(null);
    }
  };

  const handleClose = () => {
    setQRcode(null);
  };

  const handleTurnOn = async (id, qr_planet_id) => {
    const token = Cookies.get("accessToken");
    const url = process.env.REACT_APP_PRODUCTION_URL;

    try {
      const response = await axios.put(`${url}/api/qrcode/change-status`, { code: qr_planet_id }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(response.data.resultMessage.en, { duration: 2000 });
      handleClose();
    } catch (error) {
      console.error("Error making API call:", error);
      toast.error(error.response.data.resultMessage.en, { duration: 5000 });
    }
  };
<<<<<<< HEAD
  console.log(item.qr_planet_id);
=======

>>>>>>> master
  return (
    <div className="item-card">
      <img src={item?.image_url} alt={item.name} className="item-image" />
      <h5 style={{ fontSize: "12px", color: "#1B3E51", marginTop: "6px", fontWeight: "640" }}>{item.name}</h5>
      <div className="switch-container">
        <span className="lost-mode-text">{item.is_lost ? "Lost Mode" : "Lost Mode"}</span>
        <div className="toggle-container" onClick={() => handleOpen(item?.qr_planet_id)}>
<<<<<<< HEAD
          {/* <div className={`toggle-button ${item.is_lost ? 'active' : ''}`} ></div> */}
          <div className={`toggle-button ${item.is_lost === true ? "active" : ""}`}></div>
        </div>
      </div>
      <EnableQRCode openModal={qrcode === item.qr_planet_id} closeModal={() => handleTurnOn(item.id, item.qr_planet_id)} id={item.id} />

      {/* <EnableQRCode openModal={qrcode === item.id} closeModal={() => handleTurnOn(item.id, item.qr_planet_id)} id={item.id} qr_planet_id={item.qr_planet_id} /> */}
      {/* <EnableQRCode openModal={qrcode === item.qr_planet_id} closeModal={() => handleTurnOn(item.id,item?.qr_planet_id)} id={item.id} /> */}
=======
          <div className={`toggle-button ${item.is_lost ? "active" : ""}`}></div>
        </div>
      </div>
      <EnableQRCode openModal={qrcode === item.qr_planet_id} closeModal={() => handleTurnOn(item.id, item.qr_planet_id)} id={item.id} />
>>>>>>> master
    </div>
  );
};

const QrCode = ({ searchInput }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const itemListRef = useRef(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const scrollThreshold = 1;

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
<<<<<<< HEAD
=======
            "ngrok-skip-browser-warning": "6024",
>>>>>>> master
          },
        });
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
<<<<<<< HEAD

  // Initial fetch with name=''
  useEffect(() => {
    fetchQrCodes(1, "");
  }, []);
=======
>>>>>>> master

  useEffect(() => {
    fetchQrCodes(1, debouncedSearchInput);
  }, [debouncedSearchInput, fetchQrCodes]);

<<<<<<< HEAD
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);
=======
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
>>>>>>> master

  useEffect(() => {
    if (page > 1 || debouncedSearchInput.length >= 3) {
      fetchQrCodes(page, debouncedSearchInput);
    }
  }, [page, debouncedSearchInput, fetchQrCodes]);

<<<<<<< HEAD
  useEffect(() => {
    if (debouncedSearchInput.length < 3) {
      setPage(1);
      fetchQrCodes(1, "");
    }
  }, [debouncedSearchInput, fetchQrCodes]);

  return (
    <div className="app">
      <div className="item-list">{qrCodes && qrCodes.map((item) => <ItemCard key={item.id} item={item} />)}</div>
=======
  return (
    <div className="app">
      <div className="item-list" ref={itemListRef}>
        {qrCodes.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
>>>>>>> master
      {loading && <div>Loading more items...</div>}
      <div className="footer-buttons">
        <button className="shop-button">Shop Now</button>
        <button className="activate-qr-button">Activate QR</button>
      </div>
    </div>
  );
};

export default QrCode;
