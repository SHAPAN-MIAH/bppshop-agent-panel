import React from "react";
import "../Dashboard.css";

const InfoDetails = (props) => {
  const { qty, title } = props.info;

  return (
    <div className="info-card-container">
      <div className="info-card-icon">
        {title === "Total Customer" ? (
          <i class="bi bi-people"></i>
        ) : "icon" && title === "Total Sale Amount" ? (
            <i class="bi bi-wallet"></i>
        ) : "icon" && title === "Total Commission" ? (
          <i class="bi bi-cash-coin"></i>
        ) : "icon" && title === "Total Withdrawal Commission Amount" ? (
          <i class="bi bi-cash-stack"></i>
        ) : "icon" && title === "No of Order Return" ? (
          <i class="bi bi-arrow-return-left"></i>
        ) : "icon" && title === "Return Order Value" ? (
          <i class="bi bi-wallet2"></i>
        ) : (
          "icon"
        )}
      </div>
      <div className="info-card-content">
        <h4>{qty}</h4>
        <h6>{title}</h6>
      </div>
    </div>
  );
};

export default InfoDetails;
