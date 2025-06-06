
import React, { useState, useRef, useEffect, useCallback } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import "../../styles/qr-code-scanner/qr-code-scanner.scss";
import { useNavigate, Link } from "react-router-dom";
import api from "../../middleware/api";
import icon from "../../assets/problem.gif";
import InvalidQrCode from "../invalid-qr-code/invalid-qr-code";

function QrCodeScanner() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showFormAnimation, setShowFormAnimation] = useState(false);
  const [cameraAccessDenied, setCameraAccessDenied] = useState(false);

  const videoRef = useRef(null);
  const codeReaderRef = useRef(new BrowserMultiFormatReader());
  const navigate = useNavigate();

  const verifyQrCode = useCallback(async (code) => {
    try {
      const response = await api.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/details/${code}`, {});
      const qrData = response?.data?.qrCode;
      setUserData(qrData);
      if (qrData && !qrData.user_id) {
        // handle new QR code
      } else {
        // handle existing QR code
      }
    } catch (err) {
      // handle API errors
      setError(err.response?.data?.resultMessage?.en)
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
          // code.length === 6 && result.getText().includes('https://qr.roamsmarttracker.com')
          if (true) {
            verifyQrCode(code);
          } else {
            setShowFormAnimation(true);
          }
        }
        // if (err && !(err instanceof NotFoundException)) {
        //   setError("Error accessing camera or scanning QR code.");
        // }
      });
    } catch (error) {
      setError("Error initializing camera.");
      setCameraAccessDenied(true); // Set flag if camera access is denied
    }
  }, [verifyQrCode]);

  useEffect(() => {
    if (!cameraAccessDenied) {
      startDecoding();
    }
    const codeReader = codeReaderRef.current;
    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [cameraAccessDenied, startDecoding]);

  const resetScanner = () => {
    setCode("");
    setError("");
    setUserData(null);
    setShowFormAnimation(false);
    setCameraAccessDenied(false);
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setTimeout(() => {
      startDecoding();
    }, 500);
  };

  const heading = userData?.user_id
    ? "This QR code is Already Registered"
    : "Something has gone wrong, don't worry. Let's try again.";

  const handleNextClick = () => {
    if (code) {
      navigate(`/add-qr-code/${code}`);
    }
  };

  return (
    <>
      {showFormAnimation || userData?.user_id ? (
        <InvalidQrCode
          icon={icon}
          heading={heading}
          showQrCodeIcon={true}
          userId={userData?.user_id}
          onClose={resetScanner}
        />
      ) : (
        <div className="qr-scanner form-container">
          {!code && (
            <div className="header-title">
              <h1>Activate QR</h1>
              <Link to="/" className="close-menu">
                X
              </Link>
            </div>
          )}
          {!code ? (
            <div>
              {!cameraAccessDenied ? ( 
                <div className="video-container">
              <video ref={videoRef} autoPlay />
                </div>
              ) : <p style={{ color: 'rgb(250, 111, 104)' }}>
                    Please allow camera access to scan QR codes.
                  </p> }
              {!cameraAccessDenied && (
                <div style={{ marginTop: "20px" }}>
                  <p className="heading ">
                    Scan Each QR via your phone individually to activate.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {userData ? (
                userData?.user_id ? (
                  ""
                ) : (
                  <div className="qr-bg">
              {userData.image_url ? <img alt="qr-code" src={userData.image_url} /> : null}

                  </div>
                )
              ) : (
                <p style={{color:'rgb(250, 111, 104)' }}>{error}</p>
              )}
              {!userData?.user_id  && !error ? (
                <div className="button-row">
                  <button onClick={() => navigate("/")} className="cta-button cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handleNextClick} className="cta-button next-btn">
                    Next
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default QrCodeScanner;
