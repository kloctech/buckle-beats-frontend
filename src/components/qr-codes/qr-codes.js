import React, { useEffect, useState, useCallback } from "react";
import "../../styles/qr-code/qr-code.scss";
import Cookies from "js-cookie";
import axios from "axios";
import QrCodeCard from "../qr-code-card/qr-code-card";
const QrCodes = ({ searchInput }) => {
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

  const fetchQrCodes = useCallback(
    async (searchQuery) => {
      const url = process.env.REACT_APP_PRODUCTION_URL;
      const token = Cookies.get("accessToken");

      try {
        setLoading(true);
        const response = await axios.get(`${url}/api/qrcode?name=${searchQuery}&page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQrCodes(response.data.qrCodes);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  useEffect(() => {
    if (debouncedSearchInput.length >= 3) {
      setPage(1);
      fetchQrCodes(debouncedSearchInput);
    }
  }, [debouncedSearchInput, fetchQrCodes]);

  useEffect(() => {
    if ((debouncedSearchInput.length >= 3 || debouncedSearchInput.length === 0) && page > 1) {
      fetchQrCodes(debouncedSearchInput);
    }
  }, [page, debouncedSearchInput, fetchQrCodes]);

  useEffect(() => {
    if (debouncedSearchInput.length < 3) {
      fetchQrCodes("");
    }
  }, [debouncedSearchInput, fetchQrCodes]);

  return (
    <div className="app">
      <div className="qr-codes-container">
        {qrCodes?.length === 0 ? (
          <div className="no-data-container">
            <h1>No data found</h1>
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
