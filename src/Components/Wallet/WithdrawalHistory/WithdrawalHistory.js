import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { baseURL } from "../../../BaseUrl/BaseUrl";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const WithdrawalHistory = () => {
  const token = localStorage.getItem("token");
  const [totalPage, setTotalPage] = useState(0);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const config = { headers: { Authorization: `Bearer ${token}` } };

  let currentPage = 1;
  let limit = 10;

  const url = baseURL + `/agent/withdrawal/history`;

  useEffect(() => {
    fetchWithdrawalHistory(currentPage);
  }, []);

  const fetchWithdrawalHistory = (currentPage) => {
    axios({
      method: "post",
      url: url,
      data: {
        page: currentPage,
        no_of_rows: 10,
      },
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setTotalPage(Math.ceil(res.data.data.total / limit));
      setWithdrawalHistory(res.data.data.data);
    });
  };

  const handlePageClick = async (data) => {
    await fetchWithdrawalHistory(data.selected + 1);
  };

  const withdrawRequestCancel = (request_id) => {
    axios
      .post(
        baseURL + "/agent/withdrawal/cancel",
        {
          request_id: `${request_id}`,
        },
        config
      )
      .then((res) => {
        if (res.data.status === "success") {
          fetchWithdrawalHistory(currentPage);
        }
      });
  };
  return (
    <>
      <div className="withdrawal-history-container">
        <Link className="walletBackBtn" to="/wallet">
          <p type="">
            <i class="bi bi-arrow-left-circle"></i> back
          </p>
        </Link>
        <h5>Withdrawal History</h5>

        <div className="transaction-history-table-container">
          <table>
            <thead>
              <th>Request Date</th>
              <th>Request Id</th>
              <th>Payment Method</th>
              <th>Bank</th>
              <th>Branch Name</th>
              <th>Account Number</th>
              <th>Request Amount</th>
              <th>Status</th>
              <th>Action</th>
            </thead>
            <tbody>
              {withdrawalHistory.map((listData) => (
                <tr>
                  <td data-label="Date Time">{listData.request_date}</td>
                  <td data-label="Transaction Id">{listData.request_id}</td>
                  <td data-label="Reference no">{listData.payment_method}</td>
                  <td data-label="Balance">{listData.bank}</td>
                  <td data-label="Balance">
                    {listData.branch_name ? listData.branch_name : " - "}
                  </td>
                  <td data-label="Balance">{listData.account_no}</td>
                  <td data-label="Credit">{listData.request_amount}</td>
                  <td data-label="Debit">{listData.status}</td>
                  <td data-label="">
                    {listData.status == "pending" ? (
                      <button
                        onClick={(e) =>
                          withdrawRequestCancel(listData.request_id)
                        }
                        id="withdrawRequestCancelBtn"
                        type=""
                      >
                        Cancel
                      </button>
                    ) : listData.status == "approved" ? (
                      <button id="withdrawRequestApprovedBtn">approved</button>
                    ) : (
                      <button id="withdrawRequestCanceledBtn">Canceled</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between mt-4">
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
      </div>
    </>
  );
};

export default WithdrawalHistory;
