import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { baseURL } from "../../BaseUrl/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const WalletWithdraw = () => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + "/agent/withdrawal/banks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBanks(res.data));
  }, [token]);

  const WithDrawRequestHandleChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const onSubmit = (data) => {
    const requestData = {
      bank: `${selectedBank}`,
      branch_name: `${data.branch_name}`,
      account_no: `${data.account_number}`,
      request_amount: parseInt(data.request_amount),
    };

    axios
      .post(baseURL + "/agent/withdrawal/request", requestData, config)
      .then((res) => {
        if(res.data.status === "success"){
          navigate("/wallet")
        }
      });
  };

  return (
    <>
      <div className="wallet-withdrawal-container">
        <Link className="walletBackBtn" to="/wallet">
          <p type="">
            <i class="bi bi-arrow-left-circle"></i> back
          </p>
        </Link>
        <h6>Cash Withdraw</h6>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("branch_name", { required: true })}
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
                {...register("account_number", { required: true })}
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
                {...register("request_amount", { required: true })}
                required
              />
            </div>
          </div>
          <br />
          <button id="withdrawRequestSubmitBtn" type="submit">
            Request Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default WalletWithdraw;
