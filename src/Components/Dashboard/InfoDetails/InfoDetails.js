import React from "react";
import "../Dashboard.css";

const InfoDetails = (props) => {
  const { quantity, title } = props.info;

  // console.log(props)

  return (
    <div className="info-card-container">
      <div className="info-card-icon">
        {title === "Total Customers" ? (
          <i className="bi bi-people"></i>
        ) : "icon" && title === "Total Sale amount" ? (
            <i className="bi bi-wallet"></i>
        ) : "icon" && title === "Total Commission" ? (
          <i className="bi bi-cash-coin"></i>
        ) : "icon" && title === "Total Withdrawal Commission amount" ? (
          <i className="bi bi-cash-stack"></i>
        ) : "icon" && title === "Total Return Order Amount" ? (
          <i className="bi bi-arrow-return-left"></i>
        ) : "icon" && title === "Total no of Return Order" ? (
          <i className="bi bi-wallet2"></i>
        ) : (
          "icon" && title === "Total no of Pending Order" ? (
            <i className="bi bi-wallet2"></i>
          ) : "icon" && title === 'Total no of Delivered Order' ? (
            <i className="bi bi-wallet2"></i>
          ) : 'icon'
        )}
      </div>
      
      <div className="info-card-content">
        <h4>{quantity}</h4>
        <h6>{title}</h6>
      </div>
    </div>
  );
};

export default InfoDetails;
