import React, { useEffect, useState } from "react";
import "./AddCustomer.css";
import axios from "axios";
import { baseURL } from "./../../../BaseUrl/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Select from 'react-select'


const customStyles = {
  content: {
    borderRadius: "10px",
    top: "50%",
    left: "58%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 0 500vmax rgb(0 0 0 / 0.3)",
    padding: "30px",
    paddingTop: "30px",
    width: "%",
  },
};

const AddCustomer = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [districtDataOptions, setDistrictDataOptions] = useState([]);
  const [thanaDataOptions, setThanaDataOptions] = useState([]);
  const [areaDataOptions, setAreaDataOptions] = useState([]);
 
  const [districtId, setDistrictId] = useState('');
  const [thanaId, setThanaId] = useState('');
  const [areaId, setAreaId] = useState('');


  useEffect(() => {
    const getDistrictData = () => {
      const arr = [];

      axios.get(baseURL + "/location/districts")
      .then((res) => {
        // setDistrictData(res.data.data)
        let districtDataList =  res.data.data;

        districtDataList.map(distData => {
          return arr.push({value: distData.id, label: distData.name});
        }) 
        setDistrictDataOptions(arr)
      });
    }
    getDistrictData();
  }, []);

  

  const ThanaSelectHandler = (item) => {
    const distId = item.value;
    setDistrictId(distId);

    const getThanasData = () => {
    const thanaList = [];
    axios
      .get(baseURL + `/location/thanas/${distId}`)
      .then((res) =>{

        // console.log(res)

        let thanaDataList  = res.data.data;

        thanaDataList.map(thanaData => {
          return thanaList.push({value: thanaData.id, label: thanaData.name})
        })
        setThanaDataOptions(thanaList)
        
      });
    }
    getThanasData()
  };

  const AreaSelectHandler = (item) => {
    const thanaId = item.value;
    setThanaId(thanaId);

    const getAreaData = () => {
    const areaList = [];
    axios
      .get(baseURL + `/location/areas/${thanaId}`)
      .then((res) =>{

        let areaDataList  = res.data.data;

        areaDataList.map(areaData => {
          return areaList.push({value: areaData.id, label: areaData.name})
        })
         setAreaDataOptions(areaList)
        
      });
    }
    getAreaData()
  };

  const AreaIdHandler = (item) => {
    const areaId = item.value;
    setAreaId(areaId)
  }

  const [customerData, setCustomerData] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    customer_address: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setCustomerData({ ...customerData, [input.name]: input.value });
  };


  const newCustomerData = ({...customerData, district_id: districtId, thana_id: thanaId,  area_id: areaId});

  // console.log(newCustomerData)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = baseURL + "/agent/customer/create";

      await axios
        .post(url, newCustomerData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res);
          if (res.data.status == "success") {
            setSuccessMessage(res.data.message);
            openModal();
          }
          if (res.data.status == "failed") {
            setError(res.data.message);
          }
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    }
  };
  // const notify = (data) => toast(data);

  // const [required, setRequired] = useState(true)

  return (
    <div className="add-customer-section">
      <div className="container-fluid">
        <h2>Add Customer</h2>
        <div className="add-customer-form-container">
          <form onSubmit={handleSubmit}>
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
            <div>
              <label for="">Customer Email</label>
              <br />
              <input
                type="email"
                name="customer_email"
                placeholder="Enter Customer Email"
                onChange={handleChange}
                value={customerData.customer_email}
                // required
              />
            </div>
            <div>
              <label for="">Customer District</label>
              <br />
              <Select
                placeholder={"Select District"}
                onChange={(item) => ThanaSelectHandler(item)}
                noOptionsMessage={() => "District not found"}
                options={districtDataOptions}
                className="border rounded-3 px-2 "
              />
            </div>
            <div>
              <label for="">Customer Thana</label>
              <br />
              <Select
                placeholder={"Select Thana"}
                onChange={(item) => AreaSelectHandler(item)}
                noOptionsMessage={() => "Thana not found"}
                options={thanaDataOptions}
                className="border rounded-3 px-2 "
              />
            </div>
            <div>
              <label for="">Customer Area</label>
              <br />
              <Select
                placeholder={"Select Area"}
                onChange={(item) => AreaIdHandler(item)}
                noOptionsMessage={() => "Area not found"}
                options={areaDataOptions}
                className="border rounded-3 px-2"
              />
            </div>
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
        <h6 className="text-danger">{error}</h6>
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

      <Link to="/customer/customer-list">
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              cursor: "pointer",
              fontFamily: "Montserrat",
              // fontSize: "25px",
              color: "#002a47",
            }}
          >
            <h6 className="text-success">{successMessage}</h6>
            <br />
            <Link to="/customer/customer-list">
              <span
                style={{
                  border: "none",
                  background: "#16a0da",
                  padding: "5px 20px",
                  borderRadius: "5px",
                  color: "#ffff",
                  fontFamily: "Montserrat",
                }}
                onClick={closeModal}
              >
                Ok
              </span>
            </Link>
          </div>
        </Modal>
      </Link>
    </div>
  );
};

export default AddCustomer;
