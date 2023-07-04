import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Wallet.css";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import WalletWithdraw from "./WalletWithdraw";
import { Link } from "react-router-dom";

const Wallet = () => {
  const token = localStorage.getItem("token");
  const [agent, setAgent] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, [token]);

  const [totalPage, setTotalPage] = useState(0);
  const [transactionHistoryData, setTransactionHistoryData] = useState([]);

  let currentPage = 1;
  let limit = 10;

  const url = baseURL + `/agent/transactions`;

  useEffect(() => {
    fetchTransactionHistoryList(currentPage);
  }, []);

  const fetchTransactionHistoryList = (currentPage) => {
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
      setTransactionHistoryData(res.data.data.data);
    });
  };

  const handlePageClick = async (data) => {
    await fetchTransactionHistoryList(data.selected + 1);
  };

  return (
    <>
      <div className="wallet-section">
        <div className="container-fluid">
          <div className="wallet-content-container">
            <h2>Wallet</h2>

            <div className="row">
              <div className="col-md-3">
                <div className="wallet-balance-container">
                  <h6>Available Balance</h6>
                  <h4>Tk. {agent.wallet_balance}</h4>
                  {/* <h4>৳ 234787</h4> */}
                  <div className="balance-up-down">
                    <span>
                      <i className="bi bi-arrow-up-right"></i>{" "}
                      <small>+ 0.00</small>
                    </span>
                    <span>
                      <i className="bi bi-arrow-down-left"></i>{" "}
                      <small>- 0.00</small>
                    </span>
                  </div>
                </div>
                <div className="withdraw-request-history-container">
                    <Link to="/withdraw-request">
                    <div className="withdraw-request">
                      <i className="bi bi-arrow-90deg-down"></i>
                      <h5>Balance Withdraw Request</h5>
                    </div>
                    </Link>
                    <Link to="/withdrawal-history">
                    <div className="withdraw-history">
                    <i class="bi bi-card-list"></i>
                      <h5>Withdrawal History</h5>
                    </div>
                    </Link>
                    
                    
                  </div>

                {/* <div className="wallet-security-container">
                  <h6>Security</h6>

                  <div>
                    <p className="d-flex justify-content-between">
                      <span>
                        <i className="bi bi-lock"></i> Key
                      </span>{" "}
                      <button>Change</button>
                    </p>
                  </div>
                </div> */}
              </div>
              <div className="col-md-9">
                <div className="transaction-container">
                  <h5>Transaction History</h5>

                  <div className="transaction-history-table-container">
                    <table>
                      <thead>
                        <th>Transaction Date</th>
                        <th>Transaction Id</th>
                        <th>Order Group Id</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Reference</th>
                        <th>Balance </th>
                      </thead>
                      <tbody>
                        {transactionHistoryData.map((listData) => (
                          <tr>
                            <td data-label="Date Time">
                              {listData.transaction_date}
                            </td>
                            <td data-label="Transaction Id">
                              {listData.transaction_id}
                            </td>
                            <td data-label="Order Group Id">
                              {listData.order_group_id}
                            </td>
                            <td data-label="Credit">{listData.credit}</td>
                            <td data-label="Debit">{listData.debit}</td>
                            <td data-label="Reference no">
                              {listData.reference}
                            </td>
                            <td data-label="Balance">{listData.balance}</td>
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
                            
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
