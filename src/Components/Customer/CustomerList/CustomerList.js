import React, { useState } from "react";
import "./CustomerList.css";
import CustomerListTable from "./CustomerListTable/CustomerListTable";

const CustomerListData = [
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
  {
    customerId: "12314243",
    customerName: "Jamal Uddin",
    zone: "Dhanmondi",
    division: "Dhaka",
    email: "example@gmail.com",
    mobileNumber: "012345698745",
    customerAddress: "180, Jagonnath, Kalicharan Saha Rd, Dhaka 1211",
  },
];

const CustomerList = () => {
  const [customerListData, setCustomerListData] = useState(CustomerListData);
  return (
    <div className="customer-list-section">
      <div className="container-fluid">
        <div className="customer-list-header">
          <h2>Customer List</h2>
          <div className="customer-list-input-btn">
            <button type="">
              Add New Customer <i class="bi bi-person-plus-fill"></i>
            </button>
            <input type="" name="" placeholder="Search Customer Name/ID" />
          </div>
        </div>
        <div className="customer-list-print">
          <p>
            Print:{" "}
            <button type="">
              <i class="bi bi-printer"></i>
            </button>
          </p>
        </div>

        <div className="table-container">
          <table>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Zone/Area</th>
              <th>Division</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Customer Address</th>
              <th>Action</th>
            </tr>
            {customerListData.map((listData) => (
              <tr>
                <td>#{listData.customerId}</td>
                <td>{listData.customerName}</td>
                <td>{listData.zone}</td>
                <td>{listData.division}</td>
                <td>{listData.email}</td>
                <td>{listData.mobileNumber}</td>
                <td>{listData.customerAddress}</td>
                <td className="d-flex">
                  <button>Select Customer</button>{" "}
                  <i class="bi bi-pencil-square"></i>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="select-customer-btn-container">
        <button type="">Select Customer</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
