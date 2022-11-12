import React from "react";
import Sidebar from "./../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./AgentPanelHome.css";
import profileImg from "../../assets/image/images (1).jpg";

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
                <i onClick={menuToggle} class="bi bi-list"></i>
              </span>

              <span className="closeBar-icon">
                <i onClick={menuCloseToggle} class="bi bi-x-lg"></i>
              </span>
            </div>
            <div className="user-tab">
              <input type="text" name="" placeholder="Search" />
              <i class="bi bi-search"></i>
              <small>Admin</small>
              <div className="user-profile">
                <img src={profileImg} alt="" />
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
