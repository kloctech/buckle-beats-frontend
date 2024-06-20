import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import "../../styles/qr-code-scanner/qr-code-scanner.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function QrCodeScanner() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const verifyQrCode = async (code) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/details/${code}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        setUserData(response?.data?.qrCode);
      } catch (err) {
        console.log(err);
      }
    };

    const startDecoding = async () => {
      try {
        await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
          if (result) {
            const code = result.getText().split("/").pop();
            setCode(code);
            setError("");
            codeReader.reset();

            if (code.length === 6 && result.getText().includes("https://bucklebeats.qrplanet.com")) {
              verifyQrCode(code);
            } else {
              setError("Invalid QR code");
            }
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error("QR Scan Error:", err);
            setError("Error accessing camera or scanning QR code.");
          }
        });
      } catch (error) {
        console.error("Camera initialization error:", error);
        setError("Error initializing camera.");
      }
    };

    startDecoding();

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  const handleNextClick = () => {
    if (code) {
      navigate(`/add-qr-code/${code}`);
    }
  };

  window.addEventListener("popstate", function (event) {
    window.location.reload();
  });

  return (
    <div className="qr-scanner form-container">
      <h1>QR Code Scanner</h1>
      {!code ? (
        <div className="video-container">
          <video ref={videoRef} autoPlay />
        </div>
      ) : (
        <>
          {userData ? (
            userData?.user_id ? (
              <p style={{ color: "#58d7b5" }} className="result-text">
                This QR code Already Registered
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
  );
}

export default QrCodeScanner;
