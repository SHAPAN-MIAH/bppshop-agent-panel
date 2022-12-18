// import React from "react";
// import styles from "../Signup.module.css";
// import "../signup.css";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from 'axios';
// import { baseURL } from './../../../BaseUrl/BaseUrl';


// const SignupForm = () => {

//     const [data, setData] = useState({
//         agent_name: "",
//         agent_email: "",
//         agent_mobile_number: "",
//         password: "",
//         district_id: "",
//         area_id: "",
//     });
    
//     console.log(data)

//     const [districtData, setDistrictData] = useState([]);
//     const [areaData, setAreaData] = useState([]);
//     const [districtId, setDistrictId] = useState('');
//     const [areaId, setAreaId] = useState('');
    
    
//     useEffect(() => {
//         axios
//           .get(baseURL + "/location/districts")
//         .then((res) => {
//           setDistrictData(res.data.data)
//         });
//     }, []);
    
      
//     const AreaSelectHandler = (e) => {
//         const distId = e.target.value;
//         setDistrictId(e.target.value);
    
//         axios
//           .get(baseURL + `/location/areas/${distId}`)
//           .then((res) => setAreaData(res.data.data));
//     };
    
    
//     const AreaIdHandler = (e) => {
//         const areaId = e.target.value;
    
//         setAreaId(areaId)
//     }
    
    
//     const [registerAgent, setRegisterAgent] = useState([]);
//     const [error, setError] = useState("");
    
//     const handleChange = ({ currentTarget: input }) => {
//         setData({ ...data, [input.name]: input.value});
//     };
    
    
    
//     const [otpSuccessStatus, setOtpSuccessStatus] = useState(false);
    
//     const newData = ({...data, district_id: districtId,  area_id: areaId})
//       // console.log(newData)
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const url = baseURL + "/register";
    
//           await axios.post(url, newData).then((res) => {
//             // console.log(res);
//             setRegisterAgent(res.data.data);
    
//             if (res.data.status === "success") {
//               setOtpSuccessStatus(true);
    
//             //   const otpBox = document.querySelector(".otp_box");
//             //   otpBox.style.display = "block";
//             //   document.querySelector("#form-container").style.display = "none";
//             //   document.querySelector(".registerSuccess").style.display = "none";
//             }
//             if (res.data.status === "failed") {
//               document.querySelector(".registerSuccess").innerHTML =
//                 res.data.message + " Please try again.";
    
//             //   // document.querySelector('#form-container').style.display = 'none'
//             //   document.querySelector(".registerSuccess").style.display = "block";
//             //   document.querySelector(".registerSuccess").style.color = "red";
//             //   document.querySelector(".registerSuccess").style.textAlign = "left";
//             //   document.querySelector(".registerSuccess").style.fontSize = "14px";
//             //   document.querySelector(".registerSuccess").style.width = "100%";
//             //   document.querySelector(".registerSuccess").style.margin = "0px 30px";
//             }
//             // navigate("/login")
//           });
//         } catch (error) {
//           if (
//             error.response &&
//             error.response.status >= 400 &&
//             error.response.status <= 500
//           ) {
//             setError(error.message);
//           }
//         }
//     };
    
//   return (
//     <>
//       <div className="signup-form-container">
//         <form
//           id="form-container"
//           className={styles.form_container}
//           onSubmit={handleSubmit}
//         >
//           <h4>Create Account</h4>
//           <input
//             type="text"
//             placeholder="Name"
//             name="agent_name"
//             onChange={handleChange}
//             value={data.agent_name}
//             required
//             className={styles.input}
//             autoComplete="false"
//           />

//           <input
//             type="text"
//             placeholder="Phone Number"
//             name="agent_mobile_number"
//             onChange={handleChange}
//             value={data.agent_mobile_number}
//             required
//             className={styles.input}
//             autoComplete="false"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             name="agent_email"
//             onChange={handleChange}
//             value={data.agent_email}
//             className={styles.input}
//             autoComplete="false"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             onChange={handleChange}
//             value={data.password}
//             required
//             className={styles.input}
//             autoComplete="false"
//           />
//           <div className="area-container">
//             <select
//               name="country"
//               mode="multiple"
//               onChange={(e) => AreaSelectHandler(e)}
//               required
//             >
//               <option value="">Choose Districts ---</option>
//               {districtData?.map((district, index) => (
//                 <option value={district.id} key={index}>
//                   {district.name}
//                 </option>
//               ))}
//             </select>

//             <select name="country" onChange={(e) => AreaIdHandler(e)} required>
//               <option value="">Choose Area ---</option>
//               {areaData.map((area, index) => (
//                 <option value={area.id} key={index}>
//                   {area.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {error && <div className={styles.error_msg}>{error}</div>}

//           <button type="submit" className={styles.green_btn}>
//             Sing Up
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default SignupForm;
