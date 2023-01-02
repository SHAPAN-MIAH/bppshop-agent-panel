import React from "react";
import './PageNotFound.css'
import PageNotFoundGif from "../../assets/image/404.png"

const PageNotFound = () => {
  return (
    <div className="pageNotFoundContainer">
      <div className="">
        <img src={PageNotFoundGif} alt="Page Not Found."/>
        <br/>

        <a href="/">
        <button>Go Back</button>
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
