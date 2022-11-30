import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import "../MyCommission.css";

const PendingCommission = () => {
  const [myCommissionData, setMyCommissionData] = useState([]);

  let currentPage = 1;

  const token = sessionStorage.getItem("token");
  const url = baseURL + `/agent/commission/pending`;
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
    }).then((res) => setMyCommissionData(res.data.data.data));
    // }).then((res) => console.log(res.data.data.data));
  };

  const handlePageClick = async (data) => {
    await fetchCustomerList(data.selected + 1);
  };

  return (
    <div className="commission-history-section">
      <div className="container-fluid">
        <div className="commission-history-header">
          <h2>Pending Commission</h2>
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
            <tr>
              <th>Customer Id</th>
              <th>Order Id</th>
              <th>Total Products</th>
              <th>Total Amount</th>
              <th>Total Commission</th>
            </tr>
            {myCommissionData.map((listData) => (
              <tr>
                <td>#{listData.customer_id}</td>
                <td>{listData.order_id}</td>
                <td>{listData.total_products}</td>
                <td>৳ {listData.total_amount}</td>
                <td>৳ {listData.total_commission}</td>
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

export default PendingCommission;
