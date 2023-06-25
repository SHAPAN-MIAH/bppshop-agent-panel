import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { baseURL } from "../../BaseUrl/BaseUrl";
import { Link } from "react-router-dom";

const WalletWithdraw = () => {
  const token = localStorage.getItem("token");
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "/agent/withdrawal/banks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBanks(res.data));
  }, [token]);

  const WithDrawRequestHandleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="wallet-withdrawal-container">
        <Link className="walletBackBtn" to="/wallet">
          <p  type=""><i class="bi bi-arrow-left-circle"></i> back</p>
        </Link>
        <h6>Cash Withdraw</h6>

        <div className="withdraw-request-input-container">
          <div>
            <label for="">Choose Bank</label>
            <br />
            <select
              name="chooseBank"
              id="chooseBank"
              onChange={WithDrawRequestHandleChange}
            >
              <option value="none" selected disabled hidden>
                Choose
              </option>
              {banks?.data?.map((bank) => (
                <option value={bank?.name}>{bank?.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label for="">Branch Name</label>
            <br />
            <input
              type="string"
              name="branch_name"
              placeholder="Enter branch name"
              onChange={WithDrawRequestHandleChange}
              required
            />
          </div>
          <div>
            <label for="">Account Number</label>
            <br />
            <input
              type="number"
              name="account_number"
              placeholder="Enter account Number"
              onChange={WithDrawRequestHandleChange}
              required
            />
          </div>
          <div>
            <label for="">Request Amount</label>
            <br />
            <input
              type="number"
              name="request_amount"
              placeholder="Enter request withdraw amount"
              onChange={WithDrawRequestHandleChange}
              required
            />
          </div>
        </div>
        <br />
        <button id="withdrawRequestSubmitBtn" type="submit">
          Request Submit
        </button>
      </div>
    </>
  );
};

export default WalletWithdraw;
