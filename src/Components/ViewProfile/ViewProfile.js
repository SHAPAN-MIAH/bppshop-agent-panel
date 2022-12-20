import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import "./ViewProfile.css";

const ViewProfile = () => {
  const [agent, setAgent] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, []);

  return (
    <>
      <div className="viewProfile-section">
        <div className="container-fluid">
          <div className="viewProfile-container">
            <h2>Agent Profile</h2>
            <div className="view-profile-content-container">
              <div className="view-profile-content">
                <img
                  src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                  alt="profile"
                />
                <div className="mx-4 mt-4">
                  <h3>{agent.name}</h3>
                  <small>{agent.email}</small>
                  <br/>
                  <Link to="/update-agent-profile">
                    <button className="viewProfileEditBtn" type="">
                      <i className="bi bi-pencil-square"></i>
                      Update Profile
                    </button>
                  </Link>
                </div>
              </div>
              <div className="view-profile-contact-content">
                <div className="">
                  <h4 className="">
                    <span>Role:</span> Agent
                  </h4>

                  <h4>
                    <span>Balance</span> : {agent.wallet_balance}
                  </h4>
                </div>
                <br/>
                <h5>CONTACT INFORMATION :</h5>
                <div className="d-flex">
                  <i className="bi bi-telephone"></i>
                  <div className="mx-2">
                    <span >Mobile</span>
                    <p>{agent.phone}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <i className="bi bi-envelope"></i>
                  <div className="mx-2">
                    <span >Email</span>
                    <p>{agent.email}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <i className="bi bi-house"></i>
                  <div className="mx-2">
                    <span>Address</span>
                    {
                      agent?.address == null ? <p>{agent.area_name}, {agent.district_name}</p> : <p>{agent.address}</p> 
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
