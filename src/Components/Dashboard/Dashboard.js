import React, { useEffect, useState } from "react";
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
// import { Bar } from "react-chartjs-2";
import faker from "faker";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import { Link } from 'react-router-dom';
import avatar from '../../assets/image/profileDefaultImg.jpg'
import UseUser from '../../ContextApi/Hooks/useUser';

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
  const [agent, setAgent] = useState([]);
  const token = localStorage.getItem("token");
  // const {agent} = UseUser();

  useEffect(() => {
    axios
      .get(baseURL + "/agent/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDashboardInfo(res.data.total));
  }, [token]);
  

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
                  <div className="profile-content-container">
                    <div className="profile-content">
                     <div className="profile-avatar">
                      {agent.image? <img src={`https://agentapi.bppshop.com.bd/${agent.image}`} alt="profile" />
                      : <img src={avatar} alt="profile" />}
                     </div>
                      <div className="profile-content-textEnd">
                        <Link to='/update-agent-profile'><button className="profileEditBtn" type="">
                          {" "}
                          <i className="bi bi-pencil-square"></i>
                        </button></Link>
                        <h5>{agent.name}</h5>
                        <small>{agent.email}</small>
                        <br/>
                        
                        <h5>Balance</h5>
                        <h6>৳ {agent.wallet_balance}</h6>
                      </div>
                    </div>
                    <div className="profile-contact-content">
                    <h6 className=""><small>Role:</small> Agent</h6>
                    
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
                            {agent.address ? <span> {agent.address},</span> : ""}
                            {agent.area_name ? <span> {agent.area_name},</span> : ""}
                            {agent.area_name ? <span> {agent.thana_name},</span> : ""}
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
              </div>
              <div className="col-md-8">
                <div>
                  <div className="dashboard-info-card-container">
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
