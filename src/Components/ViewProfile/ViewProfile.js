import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from './../../BaseUrl/BaseUrl';
import { Link } from 'react-router-dom';

const ViewProfile = () => {
    const [agent, setAgent] = useState([]);
    const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, []);


    return (
        <>
         <div className='viewProfile-section'>
            <div className='container'>
            <div className="profile-container">
                  <h2>Agent Profile</h2>

                  <div className="profile-content-container">
                    <div className="profile-content">
                      <img src={`https://agentapi.bppshop.com.bd/${agent.image}`} alt="profile" />
                      <div className="text-end">
                        <Link to='/update-agent-profile'><button className="profileEditBtn" type="">
                          {" "}
                          <i class="bi bi-pencil-square"></i>
                        </button></Link>
                        <h5>{agent.name}</h5>
                        <small>{agent.email}</small>
                        <br/>
                        <br/>
                        <small>Role</small>
                        <h6 className="">Agent</h6>
                          <br/>
                        <strong>Balance</strong>
                        <p>{agent.wallet_balance}</p>
                      </div>
                    </div>
                    <div className="profile-contact-content">
                      <h5>CONTACT INFORMATION</h5>
                      <div className="d-flex">
                        <i class="bi bi-telephone"></i>
                        <div className="mx-2">
                          <label for="">Mobile</label>
                          <p>{agent.phone}</p>
                        </div>
                      </div>
                      <div className="d-flex">
                      <i class="bi bi-envelope"></i>
                        <div className="mx-2">
                          <label for="">Email</label>
                          <p>{agent.email}</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <i class="bi bi-house"></i>
                        <div className="mx-2">
                          <label for="">Address</label>
                          <p>{agent.address}</p>
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