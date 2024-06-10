import React from "react";
import "../../styles/preloader/preloader.scss";
import "../../styles/loader/loader.scss";
const Preloader = () => {
  return (
    <div className="loader-container">
      <div className="loader">{/* <div className="spinner"></div> */}</div>
    </div>
  );
};

export default Preloader;
