import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import "./signup.css";
import loginBackgroundImg from "../../assets/image/bpp_icon.png";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import OtpTimer from "otp-timer";
import { useEffect } from "react";
import { useCallback } from "react";

const Signup = () => {
  const [data, setData] = useState({
    agent_name: "",
    agent_email: "",
    agent_mobile_number: "",
    password: "",
  });

  const [registerAgent, setRegisterAgent] = useState([]);
  const [error, setError] = useState("");

  // const navigate = useNavigate();
  // const location = useLocation();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = baseURL + "/register";

      axios.post(url, data).then((res) => {
        console.log(res);
        setRegisterAgent(res.data.data);

        if (res.data.status == "success") {
          const otpBox = document.querySelector('.otp_box')
          otpBox.style.display = "block"
          document.querySelector("#form-container").style.display = "none";
          document.querySelector(".registerSuccess").style.display = "none";

        }
        if (res.data.status == "failed") {
          document.querySelector(".registerSuccess").innerHTML =
            res.data.message + " Please try again.";

          // document.querySelector('#form-container').style.display = 'none'
          document.querySelector(".registerSuccess").style.display = "block";
          document.querySelector(".registerSuccess").style.color = "red";
          document.querySelector(".registerSuccess").style.textAlign = "left";
          document.querySelector(".registerSuccess").style.fontSize = "16px";
        }
        // navigate("/login")
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.message);
      }
    }



    // const resendTimer = document.querySelector('.resendTimer');
    // resendTimer.appendChild =  <OtpTimer
    //                               minutes={2}
    //                               seconds={1}
    //                               text="Time:"
    //                               ButtonText="Resend"
    //                               resend={otpResendSubmit}
    //                           />;
    
   
  };

  const otpResendSubmit = () => {
    console.log("button clicked");
  };
  // const [timer, setTimer] = useState(120);  

  // const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

  // useEffect(() => {
  //   timer > 0 && setTimeout(timeOutCallback, 1200);
  // }, [timer, timeOutCallback]);

  // console.log(timer);

  // const resetTimer = function () {
  //  if (!timer) {
  //    setTimer(120);
  //   }
  // };



  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleOtpChange = (element, index) => {
    if(isNaN(element.value)) return false;

    setOtp([...otp.map((item, indx) => (indx === index) ? element.value : item)]);

    // focus next input

    if(element.nextSibling){
      element.nextSibling.focus();
    }
  }
  const verifyData = {
    type: 1,
    phone: registerAgent.phone,
    pin: otp.join("")
  }

  const otpSubmit = (e) => {
    e.preventDefault()

    axios.post(baseURL + "/verify", verifyData)
    .then(res => {
      console.log(res)

      if(res.data.status == "success"){
          document.querySelector(".registerSuccess").innerHTML =
            "Your pin validation successful. Please Sign in.";
          document.querySelector(".registerSuccess").style.display = "block";
          document.querySelector(".registerSuccess").style.color = "green;";
          document.querySelector(".registerSuccess").style.textAlign = "center";
          document.querySelector(".registerSuccess").style.fontSize = "18px";
      }
      if(res.data.status == "failed"){
          document.querySelector(".registerSuccess").innerHTML =
            "Your pin validation not successful. Please Try Again!.";
          document.querySelector(".registerSuccess").style.display = "block";
          document.querySelector(".registerSuccess").style.color = "red;";
          document.querySelector(".registerSuccess").style.textAlign = "center";
          document.querySelector(".registerSuccess").style.fontSize = "18px";
      }
    
    })
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <img src={loginBackgroundImg} alt="" />
          <h4>
            <span>Welcome To</span> <br /> BPP Shop Agent Panel
          </h4>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            id="form-container"
            className={styles.form_container}
            onSubmit={handleSubmit}
          >
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="agent_name"
              onChange={handleChange}
              value={data.agent_name}
              required
              className={styles.input}
              autoComplete="false"
            />

            <input
              type="text"
              placeholder="Phone Number"
              name="agent_mobile_number"
              onChange={handleChange}
              value={data.agent_mobile_number}
              required
              className={styles.input}
              autoComplete="false"
            />
            <input
              type="email"
              placeholder="Email"
              name="agent_email"
              onChange={handleChange}
              value={data.agent_email}
              className={styles.input}
              autoComplete="false"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
              autoComplete="false"
            />
            {error && <div className={styles.error_msg}>{error}</div>}

            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>

          {/* otp box */}
          <div className="otp_box">
          <h6>Enter the OTP sent to you to verify your identity</h6>
          <div className="resendTimer">
            
          </div>
          {/* <p style={styles.textLogin} on={resetTimer}>Resend OTP ({timer})</p> */}

            <div className={styles.otp_form_container}>
              {otp.map((data, index) => {
                return (
                  <input
                    type="text"
                    name="otp"
                    className="otp-field"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={e => e.target.select()}
                  />
                );
              })}
            </div>

            <button onClick={otpSubmit} type="submit"> Verify OTP</button>
          </div>

          {/* status message */}
          <div className=" d-flex justify-content-center text-center">
            <h5
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
              }}
              className="registerSuccess"
            ></h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
