import React, { useEffect, useState } from "react";
import "./AddCustomer.css";
import axios from "axios";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AddCustomer = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [customerData, setCustomerData] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    customer_address: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setCustomerData({ ...customerData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = baseURL + "/agent/customer/create";

      await axios
        .post(url, customerData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // if (res.data.status == "success") {
          //   toast(res.data.message);
          // }

          navigate("/customer/customer-list");
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  // const notify = (data) => toast(data);

  return (
    <div className="add-customer-section">
      <div className="container-fluid">
        <h2>Add Customer</h2>
        <div className="add-customer-form-container">
          <form onSubmit={handleSubmit}>
            {/* <div>
              <label for="">Customer Id</label>
              <br />
              <input type="text" name="" value="" />
            </div> */}

            <div>
              <label for="">Customer Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter Customer Name"
                name="customer_name"
                onChange={handleChange}
                value={customerData.customer_name}
                required
              />
            </div>
            <div>
              <label for="">Customer Email</label>
              <br />
              <input
                type="email"
                name="customer_email"
                placeholder="Enter Customer Email"
                onChange={handleChange}
                value={customerData.customer_email}
                required
              />
            </div>
            <div>
              <label for="">Customer Mobile</label>
              <br />
              <input
                type="text"
                name="customer_mobile"
                placeholder="Enter Mobile Number"
                onChange={handleChange}
                value={customerData.customer_mobile}
                required
              />
            </div>
            {/* <div>
              <label for="">Customer Zone/Area</label>
              <br />
              <input type="text" name="" placeholder="Enter Customer Zone" />
            </div> */}
            {/* <div>
              <label for="">Customer Division</label>
              <br />
              <input
                type="text"
                name=""
                placeholder="Enter Customer Division"
              />
            </div> */}
            <div>
              <label for="">Customer Address</label>
              <br />
              <textarea
                type="text"
                name="customer_address"
                placeholder="Enter Customer Address"
                onChange={handleChange}
                value={customerData.customer_address}
                required
              />
            </div>

            {/* <br/> */}
            <button type="submit">Submit</button>
          </form>
          
        </div>
        {/* <ToastContainer /> */}
      </div>
      {/* <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      /> */}
    </div>
  );
};

export default AddCustomer;
