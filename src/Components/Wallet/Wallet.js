import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Wallet.css";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import ReactPaginate from "react-paginate";

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
      console.log(res)
      setTotalPage(Math.ceil(res.data.data.total / limit));
      setTransactionHistoryData(res.data.data.data)
    });
  };

  const handlePageClick = async (data) => {
    await fetchCustomerList(data.selected + 1);
  };

  return (
    <>
      <div className="wallet-section">
        <div className="container-fluid">
          <div className="wallet-content-container">
            <h2>Wallet</h2>

            <div className="row">
              <div className="col-md-4">
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
                {/* <div className="wallet-information-container"> */}
                  {/* <h6>Information</h6>

                  <div className="info-content">
                    <small>Location : Tangail</small>
                    <br />
                    <small>Address : Tangail, Dhaka</small>
                    <br />
                    <small>Wallet ID : 2344t28348734gf3246</small>
                  </div> */}

                  <div className="cashOut-send-deposit-container">
                    {/* <div className="cash-out">
                      <i className="bi bi-arrow-90deg-down"></i>
                      <h5>Cash Out</h5>
                    </div>
                    <div className="deposit">
                      <i className="bi bi-arrow-90deg-up"></i>
                      <h5>Deposit</h5>
                    </div> */}
                    {/* <div className="send">
                      <i className="bi bi-arrow-90deg-right"></i>
                      <h5>Send</h5>
                    </div> */}
                  </div>
                {/* </div> */}
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
              <div className="col-md-8">
                <div className="transaction-container">
                  <h5>Transaction History</h5>

                  <div className="transaction-history-table-container">
                    <table>
                      <thead>
                        <th>Agent Id</th>
                        <th>Date Time</th>
                        <th>Transaction Id</th>
                        <th>Transaction Type</th>
                        <th>Order Group Id</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Reference no </th>
                        <th>Balance </th>
                      </thead>
                      <tbody>
                      {transactionHistoryData.map((listData) => (
                        <tr>
                          <td data-label="'Agent Id">{listData.agent_id}</td>
                          <td data-label="Date Time">{listData.date_time}</td>
                          <td data-label="Transaction Id">{listData.transaction_id}</td>
                          <td data-label="Transaction Type">{listData.transaction_type}</td>
                          <td data-label="Order Group Id">{listData.order_group_id}</td>
                          <td data-label="Credit">{listData.credit}</td>
                          <td data-label="Debit">{listData.debit}</td>
                          <td data-label="Reference no">{listData.balance}</td>
                          <td data-label="Balance">{listData.reference}</td>
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
              {/* <div className="col-md-2">
                <div className="cashOut-send-deposit-container">
                  <div className="cash-out">
                    <i className="bi bi-arrow-90deg-down"></i>
                    <h5>Cash Out</h5>
                  </div>
                  <div className="send">
                    <i className="bi bi-arrow-90deg-right"></i>
                    <h5>Send</h5>
                  </div>
                  <div className="deposit">
                    <i className="bi bi-arrow-90deg-up"></i>
                    <h5>Deposit</h5>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
