import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import "./UpdateAgent.css";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



const UpdateAgent = () => {
  const navigate = useNavigate();
  const [agent, setAgent] = useState([]);
  const token = sessionStorage.getItem("token");


  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, []);


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
      .then(res => {
  
        if(res.data.status == "success"){
          notify()
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const notify = () => toast("agent update successfully");

  return (
    <>
      <div className="update-agent-section">
        <div className="container-fluid">
          <h2 className="mt-5 mx-5">Update Agent Profile</h2>
          <div className="update-agent-content-container">
            <div className="update-agent-header">
              <div className="profile-picture">
              <img src={`https://agentapi.bppshop.com.bd/${agent.image}`} alt="profile" />
              </div>
              <div className="mx-4">
                <h2>{agent.name}</h2>
                <p>Agent</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label for="">Agent Name</label>
                <br />
                <input
                  type="text"
                  name="agent_name"
                  defaultValue={agent.name}
                  {...register("agent_name")}
                />
              </div>
              <div>
                <label for="">Agent Mobile</label>
                <br />
                <input
                  type="number"
                  name="customer_phone"
                  value={agent.phone}
                  {...register("customer_phone")}
                />
              </div>
              <div>
                <label for="">Agent Email</label>
                <br />
                <input
                  type="email"
                  name="customer_email"
                  value={agent.email}
                  {...register("customer_email")}
                />
              </div>
              <div>
                <label for="">Agent Address</label>
                <br />
                <input
                  type="text"
                  name="agent_address"
                  defaultValue={agent.address}
                  {...register("agent_address")}
                />
              </div>
              <div>
                <label for="">Profile Image</label>
                <br />
                <input type="file" name="image" {...register("image")}  multiple="multiple"/>
              </div>
              <br />
              <button type="submit">Submit</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAgent;
