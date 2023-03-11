import React from "react";
import "../Dashboard.css";

const InfoDetails = (props) => {
  const {
    total_customers,
    total_orders,
    total_sale_amount,
    total_commission,
    total_withdraw,
    total_purchase,
  } = props.info;

  // console.log(props)

  return (
    <>
      <div className="info-card-container">
        <div className="info-card-icon">
          <i className="bi bi-people"></i>
        </div>

        {/* <div className="info-card-icon">
        {title === "total_customers" ? (
          <i className="bi bi-people"></i>
        ) : "icon" && title === "total_orders" ? (
            <i className="bi bi-wallet"></i>
        ) : "icon" && title === "total_sale_amount" ? (
          <i className="bi bi-cash-coin"></i>
        ) : "icon" && title === "total_commission" ? (
          <i className="bi bi-cash-stack"></i>
        ) : "icon" && title === "total_withdraw" ? (
          <i className="bi bi-arrow-return-left"></i>
        ) : "icon" && title === "total_purchase" ? (
          <i className="bi bi-wallet2"></i>
        ) : ( 'icon'
        )}
      </div> */}

        <div className="info-card-content">
          <h4>{total_customers}</h4>
          <h6>Total Customers</h6>
        </div>
      </div>
      <div className="info-card-container">
        <div className="info-card-icon">
           <i className="bi bi-cart-check"></i> 
        </div>

        <div className="info-card-content">
          <h4>{total_orders}</h4>
          <h6>Total Orders</h6>
        </div>
      </div>
      <div className="info-card-container">
        <div className="info-card-icon">
           <i className="bi bi-cash-coin"></i>
        </div>

        <div className="info-card-content">
          <h4>{total_sale_amount == null ? "0" :  total_sale_amount}</h4>
          <h6>Total Sale Amount</h6>
        </div>
      </div>
      <div className="info-card-container">
        <div className="info-card-icon">
          <i className="bi bi-cash-stack"></i>
        </div>
        <div className="info-card-content">
          <h4>{total_commission == null ? "0" : total_commission}</h4>
          <h6>Total Commission</h6>
        </div>
      </div>
      <div className="info-card-container">
        <div className="info-card-icon">
          
            <i className="bi bi-arrow-return-left"></i>
          
        </div>
        <div className="info-card-content">
          <h4>{total_withdraw}</h4>
          <h6>Total Withdraw</h6>
        </div>
      </div>
      <div className="info-card-container">
        <div className="info-card-icon">
        <i className="bi bi-cart-plus"></i>
        </div>
        

        <div className="info-card-content">
        <h4>{total_purchase}</h4>
        <h6>Total Purchase</h6>
      </div>
      </div>
    </>
  );
};

export default InfoDetails;
