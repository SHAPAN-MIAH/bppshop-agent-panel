import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import { useParams } from 'react-router-dom';
import './EditCustomer.css'

const EditCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const token = localStorage.getItem("token");

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value.item(0));
      } else {
        formData.append(key, value);
      }
    });

    axios
      .post(baseURL + "/agent/profile/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status == "success") {
          notify();

          // window.onload()
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const notify = () => toast("agent update successfully");


  return (
    <>
      <div className="update-customer-section">
        <div className="">
          <h5 className="mt-5">Update Customer</h5>
          <div className="update-customer-content-container">
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label for="">Customer Name</label>
                <br />
                <input
                  type="text"
                  name="agent_name"
                  defaultValue={customer.name}
                  {...register("agent_name")}
                />
              </div>
              
              <div>
                <label for="">Customer Address</label>
                <br />
                <input
                  type="text"
                  name="agent_address"
                  defaultValue={customer.address}
                  {...register("agent_address")}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
