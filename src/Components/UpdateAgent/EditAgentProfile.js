import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";

const EditAgentProfile = () => {
  const [agent, setAgent] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, [token]);

  return (
    <>
      <div className="editAgentProfile-section">
        <div className="container-fluid">
          <div className="editAgent-container">
            <div className="editAgent-profile-view">
              <h2>Edit Agent Profile</h2>
              <div className="editAgent-profile">
                <div className="editAgent-profile-header">
                  <div className="profile-picture">
                    <img
                      src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                      alt="profile"
                    />
                  </div>
                  <div className="editAgent-profile-name">
                    <h3>{agent.name}</h3>
                    <p>Agent</p>
                  </div>
                </div>
                <div className="editAgent-profile-content-view">
                  <div className="view-profile-contact-content">
                    <div className="">
                      <h4 className="">
                        <span>Role:</span> Agent
                      </h4>

                      <h4>
                        <span>Balance</span> : {agent.wallet_balance}
                      </h4>
                    </div>
                    <br />
                    <h5>CONTACT INFORMATION :</h5>
                    <div className="d-flex">
                      <i className="bi bi-telephone"></i>
                      <div className="mx-2">
                        <span>Mobile</span>
                        <p>{agent.phone}</p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <i className="bi bi-envelope"></i>
                      <div className="mx-2">
                        <span>Email</span>
                        <p>{agent.email}</p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <i className="bi bi-house"></i>
                      <div className="mx-2">
                        <span>Address</span>
                        <p>
                          {agent.address ? <span> {agent.address},</span> : ""}
                          {agent.area_name ? (
                            <span> {agent.area_name},</span>
                          ) : (
                            ""
                          )}
                          {agent.district_name ? (
                            <span> {agent.district_name}</span>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                    </div>
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

export default EditAgentProfile;
