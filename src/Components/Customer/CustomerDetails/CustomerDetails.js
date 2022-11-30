import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import axios from "axios";
import profileImg from "../../../assets/image/profileDefaultImg.jpg";
import "./CustomerDetails.css";

const CustomerDetails = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const [customerDetail, setCustomerDetail] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + `/agent/customer/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCustomerDetail(res.data.data));
  }, [id]);

  return (
    <div className="customer-details-section">
      <div className="container-fluid">
        <div className="mt-5 mx-5">
        <h2>Customer Profile</h2>
        <div className="customer-details-container">
          <img src={profileImg} alt="img" />
          <div className="customer-profile">
            <h4>Customer Name: {customerDetail.customer_name}</h4>
            <div className="d-flex justify-content-between">
              <div>
                <h6>Customer Id: {customerDetail.id}</h6>
                <h6>Customer Email: {customerDetail.customer_email}</h6>

                <button type="">Edit Customer</button>
              </div>
              <div>
                <h6>Customer Mobile: {customerDetail.customer_mobile}</h6>
                <h6>Customer Address: {customerDetail.customer_address}</h6>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
