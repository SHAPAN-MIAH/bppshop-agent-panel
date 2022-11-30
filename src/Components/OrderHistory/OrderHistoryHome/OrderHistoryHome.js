import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { baseURL } from './../../../BaseUrl/BaseUrl';
import axios from 'axios';

// const OrderHistoryData = [
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1400",
//       totalCommission: "340"
//     },
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1300",
//       totalCommission: "300"
//     },
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1200",
//       totalCommission: "300"
//     },
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1500",
//       totalCommission: "350"
//     },
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1350",
//       totalCommission: "300"
//     },
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1200",
//       totalCommission: "300"
//     },
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1300",
//       totalCommission: "300"
//     },
//     {
//       customerId: "12314243",
//       customerName: "Jamal Uddin",
//       noOfOrder: "12",
//       totalOrderValue: "1600",
//       totalCommission: "400"
//     },
   
//   ];

const OrderHistoryHome = () => {
    const [orderHistoryData, setOrderHistoryData] = useState([]);

  let currentPage = 1;

  const token = sessionStorage.getItem("token");
  const url = baseURL+`/agent/order/all`;
  useEffect(() => {
    fetchCustomerList(currentPage);
  }, []);

  const fetchCustomerList = (currentPage) => {

    axios({
      method: 'post',
      url: url,
      data: {
        page: currentPage,
        no_of_rows: 10
      },
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((res) => setOrderHistoryData(res.data.data.data));
  };

  const handlePageClick = async (data) => {
    await fetchCustomerList(data.selected + 1);
  };
    
    return (
      <div>
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
                <i className="bi bi-printer"></i>
              </button>
            </p>
          </div>
  
          <div className='history-table mb-4'>
            <table>
              <tr>
              <th>Order Date</th>
                <th>Order Id</th>
                <th>Customer Id</th>
                <th>Total Products</th>
                <th>Total Amount</th>
                <th>Action</th>
                <th>Bill Folder</th>
              </tr>
              {orderHistoryData.map((listData) => (
                <tr>
                  <td>{listData.order_date}</td>
                  <td>{listData.order_id}</td>
                  <td>{listData.customer_id}</td>
                  <td>{listData.total_products}</td>
                  <td>৳ {listData.total_amount}</td>
                  <td >
                    <Link to='/order-history/order-details'><button id='seeOrderBtn'>See Order</button></Link>
                  </td>
                  <td >
                  <Link to='/order-history/order-bills'><i className="bi bi-folder" ></i></Link>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={15}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
          
        </div>
      </div>
    );
};

export default OrderHistoryHome;