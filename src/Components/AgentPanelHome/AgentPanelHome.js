import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
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

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    axios.get(baseURL+ "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, []);

  const handleLogout = () => {
		sessionStorage.removeItem("token");
		window.location.reload();
	};

  return (
    <>
      <div className="agent-panel-home-section">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-content-outlet-container">
          <div className="dashboard-navbar">
            <div className="content-title">
              <span className="bar-icon">
                <i onClick={menuToggle} className="bi bi-list"></i>
              </span>

              <span className="closeBar-icon">
                <i onClick={menuCloseToggle} className="bi bi-x-lg"></i>
              </span>
            </div>
            <div className="user-tab">
              <input type="text" name="" placeholder="Search" />
              <i className="bi bi-search"></i>
                  <small>{agent?.name}</small>
                  <div className="user-profile " type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img src={`https://agentapi.bppshop.com.bd/${agent.image}`} alt="profile" />
                  </div>

                  <div className="dropdown-menu profile_dropdown">
                    <ul>
                      <li >
                        <a className="dropdown-item" href="/view-profile"> View Profile
                        </a>
                      </li>
                      <li onClick={handleLogout}>
                        <a className="dropdown-item"> Logout
                        </a>
                      </li>
                    </ul>
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
