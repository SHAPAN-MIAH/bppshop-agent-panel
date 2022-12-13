import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import "../MyCommission.css";


const CommissionHistory = () => {
    const [commissionHistory, setCommissionHistory] = useState([]);
    const [totalPage, setTotalPage] = useState(0);


    let currentPage = 1;
    let limit = 10;

    const token = localStorage.getItem("token");
    const url = baseURL + `/agent/commission/history`;
    useEffect(() => {
      fetchCustomerList(currentPage);
    }, []);
  
    const fetchCustomerList = (currentPage) => {
      axios({
        method: "post",
        url: url,
        data: {
          page: currentPage,
          no_of_rows: 10,
        },
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setTotalPage(Math.ceil(res.data.data.total / limit))
        setCommissionHistory(res.data.data.data)});
    //   }).then((res) => console.log(res.data.data.data));
    };
  
    const handlePageClick = async (data) => {
      await fetchCustomerList(data.selected + 1);
    };
  
    return (
      <div className="commission-history-section">
        <div className="container-fluid">
          <div className="commission-history-header">
            <h2>Commission History</h2>
            <div>
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
          <div className="mb-4">
            <table>
              <thead>
                <th>Customer Id</th>
                <th>Order Id</th>
                <th>Total Products</th>
                <th>Total Amount</th>
                <th>Total Commission</th>
              </thead>
              {commissionHistory.map((listData) => (
                <tr>
                  <td data-label="Customer Id">#{listData.customer_id}</td>
                  <td data-label="Order Id">{listData.order_id}</td>
                  <td data-label="Total Products">{listData.total_products}</td>
                  <td data-label="Total Amount">৳ {listData.total_amount}</td>
                  <td data-label="Total Commission">৳ {listData.total_commission}</td>
                </tr>
              ))}
            </table>
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPage}
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

export default CommissionHistory;