import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home/home.scss';
import image1 from '../../assets/image1.jpg.jpg';
import image2 from '../../assets/image2.jgp.jpg'
import image3 from '../../assets/image3.jpg.jpg';
import image4 from '../../assets/image4.jpg.jpg';
import image5 from '../../assets/image5.jpg.jpg';
import image7 from '../../assets/image7.jpg.jpg'
import image6 from '../../assets/image6.jpg.jpg'
import image8 from '../../assets/image8.jpg.jpg'
import video1 from '../../assets/video1.mp4.webm'
import video2 from '../../assets/video2.mp4.mp4'
import  video3 from '../../assets/video3.mp4.mp4'
import Loader from '../../loader';
import Navbar from '../navbar/navbar';
const mediaContentMap = [
   { type: 'image', url: image1, heading: "Get your teams on WeTransfer", features: ["Stay consistent with team-wide branding"], buttonText: "Subscribe" },
   { type: 'image', url: image2, heading: "Share large files easily", features: ["Fast and secure file transfer"], buttonText: "Get Started" },
   { type: 'video', url: video1, heading: "Collaborate with your team", features: ["Real-time collaboration tools"], buttonText: "Collaborate Now" },
   { type: 'video', url: video2, heading: "Work seamlessly from anywhere", features: ["Flexible remote work solutions"], buttonText: "Work Now" },
   { type: 'video', url: video3, heading: "Innovate together", features: ["Tools to enhance creativity"], buttonText: "Innovate Now" },
   { type: 'image', url: image3, heading: "Backup your files", features: ["Secure and reliable backup solutions"], buttonText: "Backup Now" },
   { type: 'image', url: image4, heading: "Access files anywhere", features: ["Sync files across devices"], buttonText: "Access Now" },
   { type: 'image', url: image5, heading: "High-speed transfers", features: ["No delay, high-speed uploads"], buttonText: "Transfer Now" },
   { type: 'image', url: image6, heading: "Seamless sharing", features: ["Easy sharing options"], buttonText: "Share Now" },
   { type: 'image', url: image7, heading: "Secure file storage", features: ["Encrypted and safe storage"], buttonText: "Store Now" },
   { type: 'image', url: image8, heading: "Reliable and fast", features: ["Trusted by millions"], buttonText: "Try Now" }
 ];
 
 const BackgroundChanger = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const getRandomMediaIndex = () => Math.floor(Math.random() * mediaContentMap.length);
    setCurrentMediaIndex(getRandomMediaIndex());

    const intervalId = setInterval(() => {
      setCurrentMediaIndex(getRandomMediaIndex());
    }, 12000); 
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const { type, url, heading, features, buttonText } = mediaContentMap[currentMediaIndex];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="background-changer">
          {type === 'video' ? (
            <video ref={videoRef} src={url} autoPlay loop muted className="background-media" />
          ) : (
            <div className="background-media" style={{ backgroundImage: `url(${url})` }} />
          )}
          <div className="overlay">
            <div className="content">
              <div className="left-panel">
                <div className="message-box">
                  <h1>You're almost there</h1>
                  <p>
                    To continue, please agree to our <a href="#">Terms of Service</a>, and acknowledge our <a href="#">Privacy Policy</a>.
                  </p>
                  <button>I agree</button>
                </div>
              </div>
              <div className="right-panel">
                <div className="heading">{heading}</div>
                <ul className="features">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button>{buttonText}</button>
              </div>
             
            </div>
          </div>
         
        </div>
      )}
       {type === 'video' && (
                <button className="play-pause-btn" onClick={handlePlayPause}>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              )}
    </div>
  );
};

export default BackgroundChanger;