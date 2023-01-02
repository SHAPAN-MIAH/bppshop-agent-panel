import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import InfoDetails from "./InfoDetails/InfoDetails";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";
import avatar from "../../assets/image/profileDefaultImg.jpg";
import UseUser from "../../ContextApi/Hooks/useUser";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [agent, setAgent] = useState([]);
  const token = localStorage.getItem("token");
  // const {agent} = UseUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseURL + "/agent/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDashboardInfo(res.data.data);
        setLoading(false);
      });
  }, [token]);

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
      <div className="dashboard-section">
        <div className="container-fluid">
          <h2>Dashboard</h2>
          <div className="dashboard-container">
            <div className="row">
              <div className="col-md-4">
              <SkeletonTheme baseColor="#dfdfdf" highlightColor="#f5f5f5">
                {loading ? (
                  <Skeleton 
                  height="450px"
                  borderRadius="10px"
                  count={1}/>
                ) : (
                  <div className="profile-container">
                    <div className="profile-content-container">
                      <div className="profile-content">
                        <div className="profile-avatar">
                          {agent.image ? (
                            <img
                              src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                              alt="profile"
                            />
                          ) : (
                            <img src={avatar} alt="profile" />
                          )}
                        </div>
                        <div className="profile-content-textEnd">
                          <Link to="/update-agent-profile">
                            <button className="profileEditBtn" type="">
                              {" "}
                              <i className="bi bi-pencil-square"></i>
                            </button>
                          </Link>
                          <h5>{agent.name}</h5>
                          <small>{agent.email}</small>
                          <br />

                          <h5>Balance</h5>
                          <h6>৳ {agent.wallet_balance}</h6>
                        </div>
                      </div>
                      <div className="profile-contact-content">
                        <h6 className="">
                          <small>Role:</small> Agent
                        </h6>

                        <h5>CONTACT INFORMATION :</h5>
                        <div className="d-flex">
                          <i className="bi bi-telephone"></i>
                          <div className="mx-3">
                            <label for="">Mobile</label>
                            <p>{agent.phone}</p>
                          </div>
                        </div>
                        <div className="d-flex">
                          <i className="bi bi-envelope"></i>
                          <div className="mx-3">
                            <label for="">Email</label>
                            <p>{agent.email}</p>
                          </div>
                        </div>
                        <div className="d-flex">
                          <i className="bi bi-house"></i>
                          <div className="mx-3">
                            <label for="">Address</label>
                            <p>
                              {agent.address ? (
                                <span> {agent.address},</span>
                              ) : (
                                ""
                              )}
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
                  </div>
                )}
                </SkeletonTheme>
              </div>
              <div className="col-md-8">
                <div>
                  <SkeletonTheme baseColor="#dfdfdf" highlightColor="#f5f5f5">
                    <div className="dashboard-info-card-container">
                      {loading ? (
                        <>
                          <Skeleton
                            height="100px"
                            borderRadius="10px"
                            count={1}
                          />
                          <Skeleton
                            height="100px"
                            borderRadius="10px"
                            count={1}
                          />
                          <Skeleton
                            height="100px"
                            borderRadius="10px"
                            count={1}
                          />
                          <Skeleton
                            height="100px"
                            borderRadius="10px"
                            count={1}
                          />
                          <Skeleton
                            height="100px"
                            borderRadius="10px"
                            count={1}
                          />
                          <Skeleton
                            height="100px"
                            borderRadius="10px"
                            count={1}
                          />
                        </>
                      ) : (
                        <InfoDetails info={dashboardInfo}></InfoDetails>
                      )}
                      {/* {dashboardInfo?.map((info) => (
                      <InfoDetails key={info} info={info}></InfoDetails>
                    ))} */}
                    </div>
                  </SkeletonTheme>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
