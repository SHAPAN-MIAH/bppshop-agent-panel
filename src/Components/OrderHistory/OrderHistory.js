import React, { useState } from 'react';

const OrderHistoryData = [
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1400",
      totalCommission: "340"
    },
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1300",
      totalCommission: "300"
    },
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1200",
      totalCommission: "300"
    },
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1500",
      totalCommission: "350"
    },
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1350",
      totalCommission: "300"
    },
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1200",
      totalCommission: "300"
    },
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1300",
      totalCommission: "300"
    },
    {
      customerId: "12314243",
      customerName: "Jamal Uddin",
      noOfOrder: "12",
      totalOrderValue: "1600",
      totalCommission: "400"
    },
   
  ];

const OrderHistory = () => {
    const [orderHistoryData, setOrderHistoryData] = useState(OrderHistoryData);
    
    return (
      <div className="customer-list-section">
        <div className="container-fluid">
          <div className="customer-list-header">
            <h2>Order History</h2>
            <div>
              {/* <button type="">
                Add New Customer <i class="bi bi-person-plus-fill"></i>
              </button> */}
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
  
          <div>
            <table>
              <tr>
                <th>Customer Id</th>
                <th>Customer Name</th>
                <th>No. Of Order</th>
                <th>Total Order Value</th>
                <th>Total Commission</th>
                <th>Action</th>
                <th>Bill Folder</th>
              </tr>
              {orderHistoryData.map((listData) => (
                <tr>
                  <td>#{listData.customerId}</td>
                  <td>{listData.customerName}</td>
                  <td>{listData.noOfOrder}</td>
                  <td>{listData.totalOrderValue}</td>
                  <td>{listData.totalCommission}</td>
                  <td>
                    <button>See Order</button>
                  </td>
                  <td>
                  <i class="bi bi-folder"></i>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
};

export default OrderHistory;