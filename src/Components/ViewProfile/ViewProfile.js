import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import "./ViewProfile.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import profileDefaultImg from "../../assets/image/profileDefaultImg.jpg";


const ViewProfile = () => {
  const [agent, setAgent] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAgent(res.data.data);
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      <div className="viewProfile-section">
        <div className="container-fluid">
          <div className="viewProfile-container">
            <h2>Agent Profile</h2>
            {loading ? (
              
            <SkeletonTheme baseColor="#dfdfdf" highlightColor="#f5f5f5">
              <div className="view-profile-content-container">
                <div className="view-profile-header-content">
                  <div className="view-profile-img">
                    <Skeleton circle={true} height='100%' count={1} />
                  </div>
                  

                  <div className="agentEditBtn">
                    <Link to="/update-agent-profile">
                      <button className="viewProfileEditBtn" type="">
                        <i className="bi bi-pencil-square"></i>
                        Edit Agent Profile
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="view-profile-name " style={{display: "inline"}}>
                  <div style={{marginLeft: "240px"}}>
                    <h3> <Skeleton  height='100%' width='30%' count={1}/></h3>
                    <small><Skeleton  height='100%' width='30%' count={1} /></small>
                  </div>
                  {/* <Link to="/update-agent-profile">
                  <button className="viewProfileEditBtn" type="">
                  <i className="bi bi-pencil-square"></i>
                  Edit Agent Profile
                  </button>
                </Link> */}
                </div>
                <div className="view-profile-contact-content">
                  <div className="">
                    <h4 className="">
                    <Skeleton  height='100%' width='30%' count={1} />
                    </h4>

                    <h4>
                    <Skeleton  height='100%' width='30%' count={1}/>
                    </h4>
                  </div>
                  <br />
                  <h5><Skeleton  height='100%' width='40%' count={1}/></h5>
                  <div className="">
                  <Skeleton  height='100%' width='50%' count={1}/>
                  </div>
                  <div className="">
                  <Skeleton  height='100%' width='50%' count={1}/>
                  </div>
                 
                  <div className="">
                  <Skeleton  height='100%' width='50%' count={1}/>
                  </div>
                </div>
              </div>
              </SkeletonTheme>
            ) : (
              <div className="view-profile-content-container">
                <div className="view-profile-header-content">
                  <div className="view-profile-img">
                    {agent.image? <img
                      src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                      alt="profile"
                    />:<img
                    src={profileDefaultImg}
                    alt=""
                  />}
                  </div>

                  <div className="agentEditBtn">
                    <Link to="/update-agent-profile">
                      <button className="viewProfileEditBtn" type="">
                        <i className="bi bi-pencil-square"></i>
                        Edit Agent Profile
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="view-profile-name">
                  <div>
                    <h3>{agent.name}</h3>
                    <small>{agent.email}</small>
                  </div>
                  <br />
                  {/* <Link to="/update-agent-profile">
                  <button className="viewProfileEditBtn" type="">
                  <i className="bi bi-pencil-square"></i>
                  Edit Agent Profile
                  </button>
                </Link> */}
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
                        {agent.area_name ? (
                          <span> {agent.thana_name},</span>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
