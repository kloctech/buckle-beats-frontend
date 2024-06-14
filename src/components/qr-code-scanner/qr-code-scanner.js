import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import '../../styles/qr-code-scanner/qr-code-scanner.scss';
import { Link } from "react-router-dom";

function QrCodeScanner() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null); // Use ref to store the code reader instance

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
      if (result) {
        setResult(result.getText());
        setError('');
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error('QR Scan Error:', err);
        setError('Error accessing camera or scanning QR code.');
      }
    });

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  useEffect(() => {
    if (result && codeReaderRef.current) {
      codeReaderRef.current.reset(); // Stop the video stream
    }
  }, [result]);

  return (
    <div className="qr-scanner form-container">
      <h1>QR Code Scanner</h1>
      {!result ? (
        <video ref={videoRef} style={{ width: '100%',borderRadius: '50%'  }} />
      ) : (
        <><p className="result-text"><a  href={result}>{result}</a></p>
        <div className="button-row"> 
        <Link to="/" className="cta-button cancel-btn">Cancel</Link>
        <Link to="/add-qr-code" className="cta-button next-btn">Next</Link>
        </div>
        </>   
      )} 
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default QrCodeScanner;
