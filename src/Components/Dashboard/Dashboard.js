import React, { useState } from "react";
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

const DashboardInfo = [
  {
    qty: 14,
    title: "Total Customer",
  },
  {
    qty: 16500,
    title: "Total Sale Amount",
  },
  {
    qty: 5000,
    title: "Total Commission",
  },
  {
    qty: 14000,
    title: "Total Withdrawal Commission Amount",
  },
  {
    qty: 10,
    title: "No of Order Return",
  },
  {
    qty: 14,
    title: "Return Order Value",
  },
];
const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState(DashboardInfo);
  return (
    <>
      <div className="dashboard-section">
        <div className="container-fluid">
          <h2>Dashboard</h2>

          <div className="dashboard-info-card-container">
            {dashboardInfo.map((info) => (
              <InfoDetails key={info.qty} info={info}></InfoDetails>
            ))}
          </div>
          <div className="chart-container">
            <div className="sales-chart-container">
              <h5>Sales Analysis</h5>
              <Bar options={options} data={data} />
            </div>
            <div className="commission-chart-container">
              <h5>Commission Analysis</h5>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
