import React from "react";
import { useState } from "react";
import './MyCommission.css'

const MyCommissionData = [
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  },
  {
    Date: "10-11-2022",
    customerId: "12314243",
    customerName: "Jamal Uddin",
    orderId: "3452345",
    paymentDescription: "Bank",
    SalesCommission: "1400",
    withDrawAmount: "340",
    purchaseAgainstCommission: "340",
    remainingBalance: "340",
  }
];

const MyCommission = () => {
  const [myCommissionData, setMyCommissionData] = useState(MyCommissionData);
  return (
    <div className="commission-history-section">
      <div className="container-fluid">
        <div className="commission-history-header">
          <h2>Commission History</h2>
          <div>
            <input type="" name="" placeholder="Search Customer Name/ID" />
          </div>
        </div>
        <div className="commission-history-contact-print">
          <div>
            <p>Agent Name : <span>Rahim Mahmud</span></p>
            <p>Agent Id : <span>RF354215</span></p>
            <p>Contact No : <span>012365478965</span></p>
            <p>Address: <span>1212, Dhaka, Bangladesh</span></p>
          </div>  
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
              <th>Date</th>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Order Id</th>
              <th>Payment Description</th>
              <th>Sales Commission</th>
              <th>Withdraw Amount</th>
              <th>Purchase Against Commission</th>
              <th>Remaining Balance</th>
            </tr>
            {myCommissionData.map((listData) => (
              <tr>
                <td>{listData.Date}</td>
                <td>#{listData.customerId}</td>
                <td>{listData.customerName}</td>
                <td>#{listData.orderId}</td>
                <td>{listData.paymentDescription}</td>
                <td>৳ {listData.SalesCommission}</td>
                <td>৳ {listData.withDrawAmount}</td>
                <td>৳ {listData.purchaseAgainstCommission}</td>
                <td>৳ {listData.remainingBalance}</td>
                
              </tr>
            ))}
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Total: ৳ 34535636</th>
              <th>Total: ৳ 994599</th>
              <th>Total: ৳ 897896</th>
              <th>Total: ৳ 345334</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCommission;
