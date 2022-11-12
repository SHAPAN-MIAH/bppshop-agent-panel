import React, { useEffect } from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/image/bpp_icon.png";

const Sidebar = () => {
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


  return (
    <>
      <div className="sidebarMenu">
        <Link to="/">
          <div className="dashboard-logo">
            <img src={logo} alt="" />
            BBP Shop <br /> Agent Panel
          </div>
        </Link>
        <div className="dashboard-profile-show-container"></div>
        <ul className="menuList">
          <NavLink to="/dashboard">
            <li className="menu-item active">
              <i class="bi bi-grid-fill"></i> Dashboard
            </li>
          </NavLink>

          <NavLink to="/dashboard/customer">
            <li
              className="menu-item projectMenu "
              onClick={projectSubmenuHandler}
            >
              <i class="bi bi-people-fill"></i> Customer{" "}
              <span>
                <i class="bi bi-chevron-down arrow"></i>
              </span>
            </li>

            <ul className="projectSubmenu">
              <Link to="/dashboard/customer/customer-list">
                <li className="menu-item">
                  <i class="bi bi-person-lines-fill"></i> Customer List
                </li>
              </Link>
              <Link to="/dashboard/customer/add-customer">
                <li className="menu-item">
                  <i class="bi bi-person-plus-fill"></i> Add Customer
                </li>
              </Link>
            </ul>
          </NavLink>

          <NavLink to="/dashboard/order-history">
            <li className="menu-item">
              <i class="bi bi-clock-history"></i> Order History
            </li>
          </NavLink>

          <NavLink to="/dashboard/my-commission">
            <li className="menu-item">
              <i class="bi bi-cash-stack"></i> My Commission
            </li>
          </NavLink>

          <li className="menu-item">
            <i className="bi bi-box-arrow-left"></i> Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
