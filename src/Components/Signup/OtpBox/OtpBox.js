// import React, { useEffect, useState } from 'react';
// import { axios } from 'axios';
// import { baseURL } from './../../../BaseUrl/BaseUrl';
// import styles from "../Signup.module.css";
// import "../signup.css";


// const OtpBox = () => {
//     const [minutes, setMinutes] = useState(2);
//     const [seconds, setSeconds] = useState(0);
  
//     useEffect(() => {
//       if (otpSuccessStatus === true) {
//         const interval = setTimeout(() => {
//           if (seconds > 0) {
//             setSeconds(seconds - 1);
//           }
  
//           if (seconds === 0) {
//             if (minutes === 0) {
//               clearInterval(interval);
//             } else {
//               setSeconds(59);
//               setMinutes(minutes - 1);
//             }
//           }
//         }, 1000);
  
//         return () => {
//           clearInterval(interval);
//         };
//       }
//     }, [otpSuccessStatus, seconds, minutes]);
  
//     const resendOtpData = {
//       type: 1,
//       phone: registerAgent.phone,
//     };
  
//     const resendOTP = () => {
//       setMinutes(2);
//       setSeconds(0);
  
//       axios.post(baseURL + "/resend", resendOtpData).then((res) => {
//         console.log(res);
//       });
//     };
  
//     const [otp, setOtp] = useState(new Array(6).fill(""));
  
//     const handleOtpChange = (element, index) => {
//       if (isNaN(element.value)) return false;
  
//       setOtp([
//         ...otp.map((item, indx) => (indx === index ? element.value : item)),
//       ]);
  
//       // focus next input
//       if (element.nextSibling) {
//         element.nextSibling.focus();
//       }
//     };
  
//     const [varifyStatus, setVerifyStatus] = useState('')
  
//     const verifyData = {
//       type: 1,
//       phone: registerAgent.phone,
//       pin: otp.join(""),
//     };
  
//     const otpSubmit = (e) => {
//       e.preventDefault();
  
//       axios.post(baseURL + "/verify", verifyData)
//       .then((res) => {
//         console.log(res);
  
//         if (res.data.status == "success") {
//            document.querySelector(".registerSuccess-msg").innerHTML =
//             "Your registration is successful.";
//           document.querySelector(".otp_box").style.display = "none";
//           document.querySelector("#otpInput").style.display = "none";
//           document.querySelector(".registerSuccess").style.display = "block";
//           document.querySelector(".registerSuccess").style.color = "green;";
//           document.querySelector(".registerSuccess").style.textAlign = "center";
//           document.querySelector(".registerSuccess").style.fontSize = "18px";
//         }
//         if (res.data.status == "failed") {
//           // document.querySelector(".registerSuccess").innerHTML =
//           //   "Your pin validation not successful. Please Try Again!.";
//           document.querySelector(".registerSuccess").style.display = "block";
//           document.querySelector(".registerSuccess").style.color = "red;";
//           document.querySelector(".registerSuccess").style.textAlign = "center";
//           document.querySelector(".registerSuccess").style.fontSize = "18px";
//         }
//       });
//     };


//     return (
//         <div>
//             <div className="otp_box">
//             <h4>Verification</h4>
//             <br />
//             <div className="resendTimer">
//               <div className="countdown-text">
//                 {seconds > 0 || minutes > 0 ? (
//                   <p>
//                     OTP Send in: {minutes < 10 ? `0${minutes}` : minutes}:
//                     {seconds < 10 ? `0${seconds}` : seconds}
//                   </p>
//                 ) : (
//                   <p>Didn't receive code?</p>
//                 )}

//                 {seconds > 0 || minutes > 0 ? null : (
//                   <button
//                     style={{
//                       color: "#ffff",
//                     }}
//                     onClick={resendOTP}
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </div>
//             </div>
//             <h6>Enter the OTP sent to you to verify your identity</h6>
//             <div className={styles.otp_form_container} id="otpInput">
//               {otp.map((data, index) => {
//                 return (
//                   <input
//                     type="text"
//                     name="otp"
//                     className="otp-field"
//                     maxLength="1"
//                     key={index}
//                     value={data}
//                     onChange={(e) => handleOtpChange(e.target, index)}
//                     onFocus={(e) => e.target.select()}
//                   />
//                 );
//               })}
//             </div>
//             <button onClick={otpSubmit} type="submit">
//               {" "}
//               Verify OTP
//             </button>
//           </div>
//         </div>
//     );
// };

// export default OtpBox;