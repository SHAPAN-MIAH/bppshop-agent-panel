import React from "react";
import Sidebar from "./../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./AgentPanelHome.css";
import profileImg from '../../assets/image/images (1).jpg'

const AgentPanelHome = () => {
  return (
    <>
      <div className="agent-panel-home-section">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-content-outlet-container">
          <div className="dashboard-navbar">
            <div className="content-title"></div>
            <div className="user-tab">
              <input type="text" name="" placeholder="Search"/>
              <i class="bi bi-search"></i>
              <small>Admin</small>
              <div className="user-profile">
                <img width="63" src={profileImg} alt="" />
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
