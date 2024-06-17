import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import "../../styles/qr-code-scanner/qr-code-scanner.scss";
import { useNavigate } from "react-router-dom";

function QrCodeScanner() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const startDecoding = async () => {
      try {
        await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
          if (result) {
            setResult(result.getText().split("/").pop());
            setError("");
            codeReader.reset();
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
    if (result) {
      navigate(`/add-qr-code/${result}`);
    }
  };

  window.addEventListener("popstate", function (event) {
    window.location.reload();
  });

  return (
    <div className="qr-scanner form-container">
      <h1>QR Code Scanner</h1>
      {!result ? (
        <div className="video-container">
          <video ref={videoRef} autoPlay />
        </div>
      ) : (
        <>
          {" "}
          <p style={{ color: "#58d7b5" }} className="result-text">
            {result}
          </p>
          <div className="button-row">
            <button onClick={() => navigate("/")} className="cta-button cancel-btn">
              Cancel
            </button>
            <button onClick={handleNextClick} className="cta-button next-btn">
              Next
            </button>
          </div>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default QrCodeScanner;