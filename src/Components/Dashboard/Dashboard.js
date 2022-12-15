import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import InfoDetails from "./InfoDetails/InfoDetails";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import { Link } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(baseURL + "/agent/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDashboardInfo(res.data.total));
  }, [token]);

  const [agent, setAgent] = useState([]);

  console.log(agent)

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, [token]);
 

  return (
    <>
      <div className="dashboard-section">
        <div className="container-fluid">
           <h2>Dashboard</h2>
          <div className="dashboard-container">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-container">
                  {/* <h2>Agent Profile</h2> */}

                  <div className="profile-content-container">
                    <div className="profile-content">
                      <img src={`https://agentapi.bppshop.com.bd/${agent.image}`} alt="profile" />
                      <div className="profile-content-textEnd">
                        <Link to='/update-agent-profile'><button className="profileEditBtn" type="">
                          {" "}
                          <i className="bi bi-pencil-square"></i>
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
                          <p>{agent.area_name}, {agent.district_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div>
                  {/* <h2>Dashboard</h2> */}

                  <div className="dashboard-info-card-container">
                    {/* hello */}
                    {dashboardInfo?.map((info) => (
                      <InfoDetails key={info} info={info}></InfoDetails>
                    ))}
                  </div>
                </div>

                {/* <div className="chart-container">
                  <div className="sales-chart-container">
                    <h5>Sales Analysis</h5>
                    <Bar options={options} data={data} />
                  </div>
                  <div className="commission-chart-container">
                    <h5>Commission Analysis</h5>
                    <Bar options={options} data={data} />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
