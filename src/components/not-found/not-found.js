import React from "react";
import {Link} from "react-router-dom";
import '../../styles/index/index.scss';
import NotFoundGif from "../../assets/Notfound-gif.gif"

const NotFound = () => {
  return (
    <div className="not-found-page">
    <div className="login-container">
      <div className="not-found-bg">
        <img src={NotFoundGif} />
        <h2>Oops something went wrong!</h2>
        <p>We cannot find the page you are looking for.</p>
        <Link to="/">Take me back</Link>
      </div>
    </div>
    </div>
  );
};

export default NotFound;
