import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import "./UpdateAgent.css";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'

const UpdateAgent = () => {
  const navigate = useNavigate();
  const [agent, setAgent] = useState([]);
  const token = localStorage.getItem("token");

  const [districtDataOptions, setDistrictDataOptions] = useState([]);
  const [thanaDataOptions, setThanaDataOptions] = useState([]);
  const [areaDataOptions, setAreaDataOptions] = useState([]);
 
  const [districtId, setDistrictId] = useState('');
  const [thanaId, setThanaId] = useState('');
  const [areaId, setAreaId] = useState('');

  useEffect(() => {
    axios
      .get(baseURL + "/agent/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAgent(res.data.data));
  }, [token]);

  // console.log(agent)

//  const agentName = agent.name;
//  const agentAddress = agent.address;
//  const agentDistrict = agent.district_id;
//  const agentThana = agent.thana_id;
//  const AgentArea = agent.area_id;

  // const [agentUpdateData, setAgentUpdateData] = useState({
  //   agent_name: '',
  //   agent_address: ''
  // });

  // const handleUpdateChange = ({ currentTarget: input }) => {
  //   setAgentUpdateData({...agentUpdateData, [input.name]: input.value})
  // }

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // console.log(data)

    // e.preventDefault();
    
    // const agentName = e.target.agent_name.value;
    // const agentAddress = e.target.agent_address.value;
    // const agentImage = e.target.agent_address.value;

    // const upDateData = {
    //   agent_name: agentName,
    //   agent_address: agentAddress
    // }

    if (districtId == null || districtId === ""){
      setDistrictId(agent.district_id);
    }
    if (thanaId == null || thanaId === ""){
      setThanaId(agent.thana_id);
    }
    if (areaId == null || areaId === ""){
      setAreaId(agent.area_id);
    }

    if (data.agent_name == null || data.agent_name === ''){
      data.agent_name = agent.name;
    }

    if (data.agent_address == null || data.agent_address === ''){
      data.agent_address = agent.address;
    }

    const newData = ({...data, district_id: districtId , thana_id: thanaId ,  area_id: areaId })

    // console.log(newData)

    const formData = new FormData();

    Object.entries(newData).forEach(([key, value]) => {
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

        // console.log(res)
  
        if(res.data.status == "success"){
          notify()

           navigate('/view-profile') 
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const notify = () => toast("agent update successfully");


  // const [districtData, setDistrictData] = useState([]);
  // const [areaData, setAreaData] = useState([]);
  // const [districtId, setDistrictId] = useState('');
  // const [areaId, setAreaId] = useState('');

  // useEffect(() => {
  //   axios
  //     .get(baseURL + "/location/districts")
  //     .then((res) => {
  //     setDistrictData(res.data.data)
  //   });
  // }, []);

  
  // const AreaSelectHandler = (e) => {
  //   const distId = e.target.value;
  //   setDistrictId(e.target.value);

  //   axios
  //     .get(baseURL + `/location/areas/${distId}`)
  //     .then((res) => setAreaData(res.data.data));
  // };



  // const AreaIdHandler = (e) => {
  //   const areaId = e.target.value;

  //   setAreaId(areaId)
  // }


  useEffect(() => {
    const getDistrictData = () => {
      const arr = [];

      axios.get(baseURL + "/location/districts")
      .then((res) => {
        let districtDataList =  res.data.data;

        districtDataList.map(distData => {
          return arr.push({value: distData.id, label: distData.name});
        }) 
        setDistrictDataOptions(arr)
      });
    }
    getDistrictData();
  }, []);


  
  useEffect(() => {
    const getThanasData = () => {
      const thanaList = [];
      axios
        .get(baseURL + `/location/thanas/${agent.district_id}`)
        .then((res) =>{
  
          let thanaDataList  = res.data.data;
  
          thanaDataList.map(thanaData => {
            return thanaList.push({value: thanaData.id, label: thanaData.name})
          })
          setThanaDataOptions(thanaList)
          
        });
      }
      getThanasData();

  }, [agent.district_id])


  useEffect(() => {
    const getAreaData = () => {
    const areaList = [];
    axios
      .get(baseURL + `/location/areas/${agent.thana_id}`)
      .then((res) =>{

        let areaDataList  = res.data.data;

        areaDataList.map(areaData => {
          return areaList.push({value: areaData.id, label: areaData.name})
        })
         setAreaDataOptions(areaList)
        
      });
    }
    getAreaData()

  }, [agent.thana_id])


  const distName = agent.district_name
  const thanaName = agent.thana_name
  const areaName = agent.area_name

  const [selectedThanaName, setSelectedThanaName] = useState('');
  const [selectedAreaName, setSelectedAreaName] = useState('');

  const ThanaSelectHandler = (item) => {
    const distId = item.value;
    setDistrictId(distId);

    const getThanasData = () => {
    const thanaList = [];
    axios
      .get(baseURL + `/location/thanas/${distId}`)
      .then((res) =>{

        let thanaDataList  = res.data.data;

        thanaDataList.map(thanaData => {
          return thanaList.push({value: thanaData.id, label: thanaData.name})
        })
        setThanaDataOptions(thanaList)
        
        setSelectedThanaName(null)
        setSelectedAreaName(null)
      });
    }
    getThanasData()

    // setSelectedThanaName(null)
    // setSelectedAreaName(null)
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
         setSelectedAreaName(null)
      });
    }
    getAreaData()
  };



  const AreaIdHandler = (item) => {
    const areaId = item.value;
    setAreaId(areaId)
  }


  

  return (
    <>
      <div className="update-agent-section">
        <div className="container-fluid">
          <h2 className="">Update Agent Profile</h2>
          <div className="update-agent-content-container">
            <div className="update-agent-header">
              <div className="profile-picture">
              <img src={`https://agentapi.bppshop.com.bd/${agent.image}`} alt="profile" />
              </div>
              <div className="update-agent-name">
                <h3>{agent.name}</h3>
                <p>Agent</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label for="agent_name">Agent Name</label>
                <br />
                <input
                  type="text"
                  name="agent_name"
                  defaultValue={agent.name}
                  // onBlur={handleUpdateChange}
                  {...register("agent_name")}
                />
              </div>
              <div>
                <label for="customer_phone">Agent Mobile</label>
                <br />
                <input
                  type="number"
                  name="customer_phone"
                  value={agent.phone}
                  // {...register("customer_phone")}
                />
              </div>
              <div>
                <label for="customer_email">Agent Email</label>
                <br />
                <input
                  type="email"
                  name="customer_email"
                  value={agent.email}
                  // {...register("customer_email")}
                />
              </div>
              
              
              <div>
                <label for="district">Agent District</label>
                <br />
                <Select
                  placeholder={distName}
                  onChange={(item) => ThanaSelectHandler(item)}
                  noOptionsMessage={() => "District not found"}
                  options={districtDataOptions} 
                  className= "border px-2 mb-2 rounded"
                />
          
                {/* <select name="district"  onChange={(item) => ThanaSelectHandler(item)} required>
                  <option value="" selected disabled hidden>{agent.district_name}</option>
                  {districtDataOptions?.map((district, index) => (
                    <option value={district.id} key={index}>
                      {district.name}
                    </option>
                   ))}
                </select> */}
              </div>
              <div>
                <label for="thana">Agent Thana</label>
                <br />
                <Select
                  placeholder={selectedThanaName == null? selectedThanaName : thanaName}
                  onChange={(item) => AreaSelectHandler(item)}
                  noOptionsMessage={() => "Thana not found"}
                  options={thanaDataOptions} 
                  className= "border px-2 mb-2 rounded"
                />
                
                {/* <select name="thana"  onChange={(item) => AreaSelectHandler(item)} required>
                  <option value="" selected disabled hidden>{agent.district_name}</option>
                  {thanaDataOptions?.map((thana, index) => (
                    <option value={thana.id} key={index}>
                      {thana.name}
                    </option>
                   ))}
                </select> */}
              </div>

              <div>
                <label for="">Agent Area</label>
                <br />
                <Select
                  placeholder={selectedAreaName == null? selectedAreaName : areaName}
                  onChange={(item) => AreaIdHandler(item)}
                  noOptionsMessage={() => "Area not found"}
                  options={areaDataOptions} 
                  className= "border px-2 mb-2 rounded"
                />

                {/* <select name="area" onChange={(item) => AreaIdHandler(item)} required>
                  <option value="" selected disabled hidden>{agent.area_name}</option>
                  {areaDataOptions.map((area, index) => (
                    <option value={area.id} key={index}>
                    {area.name}
                  </option>
                  ))}
                </select>  */}
              </div>
              <div>
                <label for="">Agent Local Address</label>
                <br />
                <input
                  type="text"
                  name="agent_address"
                  defaultValue={agent.address}
                  // onBlur={handleUpdateChange}
                  {...register("agent_address")}
                />
              </div>
              
              <div>
                <label for="">Profile Image</label>
                <br />
                <input style={{padding: "7px "}}
                 type="file" name="image" 
                 {...register("image")}  
                 multiple="multiple"/>
              </div>
              {/* <br/> */}
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
