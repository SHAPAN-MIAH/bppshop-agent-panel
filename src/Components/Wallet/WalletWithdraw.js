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
    // if (e.target.value === "bKash" || "Nagad" || "Rocket") {
    //   document.querySelector(".branch_name_input_container").style.display =
    //     "none";
    // } else {
    //   document.querySelector(".branch_name_input_container").style.display =
    //     "block";
    // }
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
        if (res.data.status === "success") {
          navigate("/wallet");
        }
      });
  };

  const [paymentType, setPaymentType] = useState("");
  const isRadioSelected = (value) => paymentType === value;
  const handleRadioClick = (event) => setPaymentType(event.target.value);

  const MobilePaymentOptionHandler = () => {
    const mobilePaymentOptionWay = document.querySelector(
      ".mobile-payment-option-way"
    );
    const bankPaymentOptionWay = document.querySelector(
      ".bank-payment-option-way"
    );

    mobilePaymentOptionWay.style.display = "block";
    bankPaymentOptionWay.style.display = "none";
  };

  const BankPaymentOptionHandler = () => {
    const bankPaymentOptionWay = document.querySelector(
      ".bank-payment-option-way"
    );
    const mobilePaymentOptionWay = document.querySelector(
      ".mobile-payment-option-way"
    );
    bankPaymentOptionWay.style.display = "block";
    mobilePaymentOptionWay.style.display = "none";
  };

  return (
    <>
      <div className="wallet-withdrawal-container">
        <Link className="walletBackBtn" to="/wallet">
          <p type="">
            <i className="bi bi-arrow-left-circle"></i> back
          </p>
        </Link>
        <h6>Cash Withdraw Request</h6>

        <div className="d-flex mt-4 mb-4">
          <div className="mobile_payment">
            <div className="d-flex align-items-center">
              <input
                type="radio"
                name="selectedRadioBtn"
                value="mobilePayment"
                checked={isRadioSelected("mobilePayment")}
                onChange={handleRadioClick}
                onClick={MobilePaymentOptionHandler}
                id="mobilePayment"
              />
              <label
                onClick={MobilePaymentOptionHandler}
                htmlFor="mobilePayment"
                className=" mx-2"
              >
                Mobile Payment
              </label>
            </div>
          </div>
          <div className="bank_payment mx-5">
            <div className="d-flex align-items-center">
              <input
                type="radio"
                name="selectedRadioBtn"
                value="bankPayment"
                checked={isRadioSelected("bankPayment")}
                onChange={handleRadioClick}
                onClick={BankPaymentOptionHandler}
                id="bankPayment"
              />
              <label
                onClick={BankPaymentOptionHandler}
                htmlFor="bankPayment"
                className=" mx-2"
              >
                Bank Payment
              </label>
            </div>
          </div>
        </div>
        <div className="mobile-payment-option-way">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="withdraw-request-input-container">
              <div>
                <label htmlFor="">Choose Mobile Banking</label>
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
                    <option key={bank?.name} value={bank?.name}>
                      {bank?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Account Number</label>
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
                <label htmlFor="">Request Amount</label>
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

        <div className="bank-payment-option-way">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="withdraw-request-input-container">
              <div>
                <label htmlFor="">Choose Bank</label>
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
                    <option key={bank?.name} value={bank?.name}>
                      {bank?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="branch_name_input_container">
                <label htmlFor="">Branch Name</label>
                <br />
                <input
                  type="string"
                  name="branch_name"
                  placeholder="Enter branch name"
                  {...register("branch_name", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="">Account Number</label>
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
                <label htmlFor="">Request Amount</label>
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

        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <div className="withdraw-request-input-container">
            <div>
              <label htmlFor="">Choose Mobile Banking</label>
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
                  <option key={bank?.name} value={bank?.name}>
                    {bank?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="branch_name_input_container">
              <label htmlFor="">Branch Name</label>
              <br />
              <input
                type="string"
                name="branch_name"
                placeholder="Enter branch name"
                {...register("branch_name", { required: true })}
                
              />
            </div>
            <div>
              <label htmlFor="">Account Number</label>
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
              <label htmlFor="">Request Amount</label>
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
        </form> */}
      </div>
    </>
  );
};

export default WalletWithdraw;
