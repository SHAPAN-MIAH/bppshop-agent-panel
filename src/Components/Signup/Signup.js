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

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [otpSuccessStatus, setOtpSuccessStatus] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = baseURL + "/register";

      await axios.post(url, data).then((res) => {
        console.log(res);
        setRegisterAgent(res.data.data);

        if (res.data.status === "success") {

         setOtpSuccessStatus(true)

          const otpBox = document.querySelector('.otp_box')
          otpBox.style.display = "block"
          document.querySelector("#form-container").style.display = "none";
          document.querySelector(".registerSuccess").style.display = "none";

        }
        if (res.data.status === "failed") {
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
   
  };

  // const otpResendSubmit = () => {
  //   console.log("button clicked");
  // };


  // const [timer, setTimer] = useState(60);  

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

  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if(otpSuccessStatus === true){
      const interval = setTimeout(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
    
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);
    
      return () => {
        clearInterval(interval);
      };
    }
    
  }, [otpSuccessStatus, seconds, minutes]);

  const resendOtpData = {
    type: 1,
    phone: registerAgent.phone
  }

  const resendOTP = () => {
    setMinutes(2);
    setSeconds(0);

    axios.post(baseURL + "/resend", resendOtpData)
    .then(res => {
      console.log(res)
    })
  };


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
        document.querySelector('.otp_box').style.display = "none"
        document.querySelector('#otpInput').style.display = "none"
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
            <h4>Create Account</h4>
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
              <div className="countdown-text">
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      OTP Send in: {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <p>Didn't receive code?</p>
                  )}

                   
                  {seconds > 0 || minutes > 0 ? (
                    null
                  ) : (
                    <button
                    style={{
                      color:  "#ffff",
                    }}
                    onClick={resendOTP}
                  >
                    Resend OTP
                  </button>
                  )}
              </div>
            </div>
            <div className={styles.otp_form_container} id='otpInput'>
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
            <div
              className="registerSuccess"
            >
              <h6>Your pin validation successful.</h6>
              <h5 className="gotoSignIng">Please <Link to='/login'>sign in</Link></h5> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
