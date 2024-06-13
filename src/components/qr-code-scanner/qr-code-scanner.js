import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      const success = (result) => {
        setScanResult(result);
        if (scannerRef.current) {
          scannerRef.current.clear();
          scannerRef.current = null;
        }
      };

      const error = (err) => {
        console.warn(err);
      };

      scanner.render(success, error);
      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear html5QrCodeScanner. Reason: ", err));
        scannerRef.current = null;
      }
    };
  }, []);

  const handleStopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(err => console.error("Failed to clear html5QrCodeScanner. Reason: ", err));
      scannerRef.current = null;
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Scan QR Codes</h1>
      {scanResult ? (
        <div>
          <p>Scan success! Here is the URL:</p>
          <a href={scanResult} target="_blank" rel="noopener noreferrer">{scanResult}</a>
        </div>
      ) : (
        <div>
          <div id="reader" style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <div className="qr-corner top-left"></div>
            <div className="qr-corner top-right"></div>
            <div className="qr-corner bottom-left"></div>
            <div className="qr-corner bottom-right"></div>
          </div>
          <button onClick={handleStopScanning} style={{ marginTop: '20px' }}>Stop Scanning</button>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
