import React, { useState, useRef, useEffect, useCallback } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import "../../styles/qr-code-scanner/qr-code-scanner.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import icon from '../../assets/problem.gif';
import InvalidQrCode from "../invalid-qr-code/invalid-qr-code";

function QrCodeScanner() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [showFormAnimation, setShowFormAnimation] = useState(false);

  const videoRef = useRef(null);
  const codeReaderRef = useRef(new BrowserMultiFormatReader());
  const navigate = useNavigate();

  const verifyQrCode = useCallback(async (code) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/details/${code}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      const qrData = response?.data?.qrCode;
      setUserData(qrData);
      if (qrData && !qrData.user_id) {
      } else {
      }
    } catch (err) {
    }
  }, []);

  const startDecoding = useCallback(async () => {
    try {
      await codeReaderRef.current.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          const code = result.getText().split("/").pop();
          setCode(code);
          setError("");
          codeReaderRef.current.reset();

          if (code.length === 6 && result.getText().includes("https://bucklebeats.qrplanet.com")) {
            verifyQrCode(code);
          } else {
            setShowFormAnimation(true);
          }
        }
        if (err && !(err instanceof NotFoundException)) {
          setError("Error accessing camera or scanning QR code.");
        }
      });
    } catch (error) {
      setError("Error initializing camera.");
    }
  }, [verifyQrCode]);

  useEffect(() => {
    startDecoding();
    const codeReader = codeReaderRef.current;
    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [startDecoding]);

  const resetScanner = () => {
    setCode("");
    setError("");
    setUserData(null);
    setShowFormAnimation(false);
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setTimeout(() => {
      startDecoding();
    }, 500);
  };

  const heading = "Something has gone wrong, don't worry. Let's try again.";

  const handleNextClick = () => {
    if (code) {
      navigate(`/add-qr-code/${code}`);
    }
  };


  return (
    <>
      {showFormAnimation ? (
        <InvalidQrCode
          icon={icon}
          heading={heading}
          showQrCodeIcon={true}
          onClose={resetScanner} // Pass resetScanner as the onClose handler
        /> 
      ) : (
        <div className="qr-scanner form-container">
          {!code && (
            <div className="header-title">
              <h1>Activate QR</h1>
              <Link to="/" className="close-menu">X</Link>
            </div>
          )}
          {!code ? (
            <div>
              <div className="video-container">
                <video ref={videoRef} autoPlay />
              </div>
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontWeight: "200", color: "#fff" }}>Scan Each QR via your phone individually to activate.</p>
              </div>
            </div>
          ) : (
            <>
              {userData ? (
                userData?.user_id ? (
                  <p style={{ color: "#58d7b5" }} className="result-text">
                    This QR code is Already Registered
                  </p>
                ) : (
                  <img alt="qr-code" src={userData?.image_url} style={{ width: "160px", borderRadius: "80px" }} />
                )
              ) : (
                <p style={{ color: "red" }}>{error}</p>
              )}

              <div className="button-row">
                <button onClick={() => navigate("/")} className="cta-button cancel-btn">
                  Cancel
                </button>
                <button disabled={userData?.user_id || error !== ""} onClick={handleNextClick} className={userData?.user_id || error !== "" ? "cta-button next-btn disabled-btn" : "cta-button next-btn "}>
                  Next
                </button> 
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default QrCodeScanner;
