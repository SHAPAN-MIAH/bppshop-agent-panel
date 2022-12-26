import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
import "./AgentPanelHome.css";
import profileImg from "../../assets/image/images (1).jpg";
import { UserContext } from "./../../App";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import axios from "axios";

const AgentPanelHome = () => {
  const menuToggle = () => {
    const sidebarMenu = document.querySelector(".sidebarMenu");
    const contentTitle = document.querySelector(".content-title");
    const barIcon = document.querySelector(".bar-icon");
    const closeBarIcon = document.querySelector(".closeBar-icon");

    sidebarMenu.classList.toggle("sidebarMenuToggle");
    contentTitle.style.marginLeft = "210px";
    contentTitle.style.transition = "250ms ease-in-out";
    barIcon.style.display = "none";
    closeBarIcon.style.display = "block";
  };
  const menuCloseToggle = () => {
    const sidebarMenu = document.querySelector(".sidebarMenu");
    const contentTitle = document.querySelector(".content-title");
    const barIcon = document.querySelector(".bar-icon");
    const closeBarIcon = document.querySelector(".closeBar-icon");

    sidebarMenu.classList.remove("sidebarMenuToggle");
    contentTitle.style.marginLeft = "0px";
    barIcon.style.display = "block";
    closeBarIcon.style.display = "none";
  };

  // user details get..

  const [agent, setAgent] = useState([]);

  // console.log(agent)

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <>
      <div className="agent-panel-home-section">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-content-outlet-container">
          <div className="dashboard-navbar fixed-top">
            <div className="content-title">
              <span className="bar-icon">
                <i onClick={menuToggle} className="bi bi-list"></i>
              </span>

              <span className="closeBar-icon">
                <i onClick={menuCloseToggle} className="bi bi-x-lg"></i>
              </span>
            </div>
            <div className="user-tab">
              {/* <input type="text" name="" placeholder="Search" />
              <i className="bi bi-search"></i> */}
              <small>{agent?.name}</small>
              <div
                className="user-profile "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                  alt="profile"
                />
              </div>

              <div className="dropdown-menu profile_dropdown">
                <div
                  className="d-flex mx-3"
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "10px 0px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    width="30"
                    height="100%"
                    src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                    alt="profile"
                  />

                  <h6>{agent?.name}</h6>
                </div>
                <Link to="/view-profile">
                  <li className="dropdown-item">View Profile</li>
                </Link>
                <li onClick={handleLogout} className="dropdown-item">
                  Logout
                </li>
              </div>
            </div>
          </div>

          <div className="agent-panel-outlet-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentPanelHome;
