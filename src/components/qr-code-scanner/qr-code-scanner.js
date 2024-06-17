import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import '../../styles/qr-code-scanner/qr-code-scanner.scss'
import { Link } from 'react-router-dom';
function QrCodeScanner() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    // Start video stream
    const startVideo = async () => {
      try {
        await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
          if (result) {
            setResult(result.getText());
            setError('');
            stopVideoStream();
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error('QR Scan Error:', err);
            setError('Error accessing camera or scanning QR code.');
          }
        });
      } catch (error) {
        console.error('Error starting video:', error);
        setError('It was not possible to start the video stream.');
      }
    };

    startVideo();

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (result && codeReaderRef.current) {
      codeReaderRef.current.reset(); // Ensure the code reader is reset
    }
  }, [result]);

  return (
    <div className="form-container">
      <h1>QR Code Scanner</h1>
      {!result ? (
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline />
        </div>
      ) : (
        <>
          <p style={{ color: '#58d7b5' }} className='result-text'>
            <a href={result} style={{ color: '#58d7b5' }}>{result}</a>
          </p>
          <div className="button-row">
            <Link to="/" className="cta-button cancel-btn">Cancel</Link>
            <Link to={result} className="cta-button next-btn">Next</Link>
          </div>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default QrCodeScanner;
