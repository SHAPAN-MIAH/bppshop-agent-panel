import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import axios from "axios";
import profileImg from "../../../assets/image/profileDefaultImg.jpg";
import "./CustomerDetails.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [customerDetail, setCustomerDetail] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + `/agent/customer/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCustomerDetail(res.data.data));
  }, [id]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = {
      customer_name: data.customer_name,
      customer_address: data.customer_address,
      customer_id: id,
    };
    // const formData = new FormData();

    // Object.entries(data).forEach(([key, value]) => {
    //   if (value instanceof FileList) {
    //     formData.append(key, value.item(0));
    //   } else {
    //     formData.append(key, value);
    //   }
    // });

    // const newFormData = {...formData, id}

    // console.log(newFormData)

    axios
      .post(baseURL + "/agent/customer/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status == "success") {
          notify();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const notify = () => toast("Customer update successfully");

  const projectSubmenuHandler = () => {
    const updateCustomerContainer = document.querySelector(
      ".update-customer-container"
    );

    updateCustomerContainer.classList.toggle("update-customer-section-active");
  };

  return (
    <div className="customer-details-section">
      <div className="container-fluid">
        <div className="mt-5 mx-5">
          <h2>Customer Profile</h2>
          <div className="customer-details-container">
            <img src={profileImg} alt="img" />
            <div className="customer-profile">
              <h4>Customer Name: {customerDetail.customer_name}</h4>
              <div className="d-flex justify-content-between">
                <div>
                  <h6><span>Customer Id:</span> {customerDetail.id}</h6>
                  <h6><span>Customer Email:</span> {customerDetail.customer_email}</h6>

                  <button onClick={projectSubmenuHandler}>
                    <i class="bi bi-pencil-square"></i> Update Customer
                  </button>
                </div>
                <div>
                  <h6><span>Customer Mobile:</span> {customerDetail.customer_mobile}</h6>
                  <h6><span>Customer Address:</span> {customerDetail.customer_address}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="update-customer-container">
            <div className="update-customer-section">
              <div className="">
                <h5 className="mt-5 mb-4">Update Customer</h5>
                <div className="update-customer-content-container">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label for="">Customer Name</label>
                      <br />
                      <input
                        type="text"
                        name="customer_name"
                        defaultValue={customerDetail.customer_name}
                        {...register("customer_name")}
                      />
                    </div>

                    <div>
                      <label for="">Customer Address</label>
                      <br />
                      <input
                        type="text"
                        name="customer_address"
                        defaultValue={customerDetail.customer_address}
                        {...register("customer_address")}
                      />
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
