import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import '../../styles/qr-code-scanner/qr-code-scanner.scss'
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
    <div className="form-container">
      <h1>QR Code Scanner</h1>
      {!result ? (
        <div className="video-container">
          <video ref={videoRef} autoPlay />
        </div>
      ) : (
        <p style={{color:'#58d7b5'}}><a href={result}  style={{color:'#58d7b5'}}>{result}</a></p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default QrCodeScanner;
