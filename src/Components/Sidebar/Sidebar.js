import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/image/bpp_icon.png";
import axios from "axios";
import { baseURL } from './../../BaseUrl/BaseUrl';
// import useUser from './../../ContextApi/Hooks/useUser';

const Sidebar = () => {
  // const {agent} = useUser()
  const token = localStorage.getItem("token");
  const [agent, setAgent] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, [token]);


  useEffect(() => {
    const btns = document.querySelectorAll(".menu-item");

    const toggleItem = (elems) => {
      elems.forEach((elem) => {
        elem.addEventListener("click", (event) => {
          removeActiveClass(elems);
          event.target.classList.add("active");
        });
      });
    };


    function removeActiveClass(elems) {
      elems.forEach((elem) => {
        if (elem.classList.contains("active")) {
          elem.classList.remove("active");
        }
      });
    }

    toggleItem(btns);
  }, []);



  const projectSubmenuHandler = () => {
    const projectSubmenu = document.querySelector(".projectSubmenu");
    const arrow = document.querySelector(".arrow");

    projectSubmenu.classList.toggle("projectSubmenuActive");
    arrow.classList.toggle("arowToggle");
  };



  const projectSubmenuHandler2 = () => {
    const projectSubmenu2 = document.querySelector(".projectSubmenu2");
    const arrow2 = document.querySelector(".arrow2");

    projectSubmenu2.classList.toggle("projectSubmenuActive");
    arrow2.classList.toggle("arowToggle");
  };



  const handleLogout = () => {
		localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn")
		window.location.reload();
	};


  return (
    <>
      <div className="sidebarMenu-container">
        <div className="sidebarMenu">
          <Link to="/">
            <div className="dashboard-logo">
              <img src={logo} alt="" />
              BPP Shop <br /> Agent Panel
            </div>
          </Link>
          <div className="dashboard-profile-show-container"></div>
          <ul className="menuList">
            <NavLink to="/">
              <li className="menu-item active">
                <i className="bi bi-grid-fill"></i> Dashboard
              </li>
            </NavLink>

            {/* <NavLink to="/customer-list"> */}
            <li
              className="menu-item projectMenu "
              onClick={projectSubmenuHandler}
            >
              <i className="bi bi-people-fill"></i> Customer{" "}
              <span>
                <i className="bi bi-chevron-down arrow"></i>
              </span>
            </li>

            <ul className="projectSubmenu">
              <Link to="/customer/customer-list">
                <li className="menu-item">
                  <i className="bi bi-person-lines-fill"></i> Customer List
                </li>
              </Link>
              <Link to="/customer/add-customer">
                <li className="menu-item">
                  <i className="bi bi-person-plus-fill"></i> Add Customer
                </li>
              </Link>
            </ul>
            
          
            <NavLink to="/order-history">
              <li className="menu-item">
                <i className="bi bi-clock-history"></i> Order History
              </li>
            </NavLink>

            <li
              className="menu-item projectMenu "
              onClick={projectSubmenuHandler2}
            >
              <i className="bi bi-cash-stack"></i> My Commission{" "}
              <span>
                <i className="bi bi-chevron-down arrow2"></i>
              </span>
            </li>

            <ul className="projectSubmenu2">
              <Link to="/commission/pending">
                <li className="menu-item">
                  <i className="bi bi-person-lines-fill"></i> Pending Commission
                </li>
              </Link>
              <Link to="/commission/commission-history">
                <li className="menu-item">
                  <i className="bi bi-person-plus-fill"></i> Commission History
                </li>
              </Link>
            </ul>
            <Link to="/wallet">
            <li className="menu-item">
              <i className="bi bi-wallet-fill"></i> Wallet
            </li>
            </Link>
            <li onClick={handleLogout} className="menu-item">
              <i  className="bi bi-box-arrow-left"></i> Logout
            </li>
          </ul>

          <div className="balance-container">
          <div>
            <div className="balance-content">
              <div>
                <p>Balance</p>
                <span>৳ {agent.wallet_balance}</span>
              </div>
            </div>
            <br />
            <p>Your Remaining Balance</p>
          </div>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Sidebar;
