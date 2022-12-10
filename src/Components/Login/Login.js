import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import styles from "../Signup/Signup.module.css";
import loginBackgroundImg from "../../assets/image/bpp_icon.png";
import { UserContext } from "../../App";
import { baseURL } from "./../../BaseUrl/BaseUrl";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    agent_email: "",
    agent_mobile_number: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = baseURL + "/login";

      await axios.post(url, data).then((res) => {
        setLoggedInUser(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", true);
        // console.log(res.data)
        let from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true });
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

  // forgot password
  const [forgotPhoneData, setForgotPhoneData] = useState("");
  const forgotData = {
    type: 2,
    phone: forgotPhoneData,
  };

  const forgotPassHandler = () => {
    document.querySelector(".loginFormContent").style.display = "none";
    document.querySelector(".forgot_pass_container").style.display = "block";
  };

  const handleForgotChange = (data) => {
    setForgotPhoneData(data);
  };

  const forgotPhoneNumberSend = () => {
    axios.post(baseURL + "/forgot", forgotData).then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        document.querySelector(".forgot_pass_content").style.display = "none";
        document.querySelector(".forgot_otp-container").style.display = "block";

        setOtpSuccessStatus(true);
      }
    });
  };

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([
      ...otp.map((item, indx) => (indx === index ? element.value : item)),
    ]);

    // focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const verifyData = {
    type: 2,
    phone: forgotPhoneData,
    pin: otp.join(""),
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    axios.post(baseURL + "/verify", verifyData).then((res) => {
      console.log(res);

      if(res.data.status == "success"){
        document.querySelector('.forgot_otp-container').style.display ="none";
        // document.querySelector('#otpInput').style.display = "none"
          // document.querySelector(".registerSuccess").innerHTML =
          //   "Your pin validation successful. Please Sign in.";
          document.querySelector(".changePassword-container").style.display ="block";
          // document.querySelector(".registerSuccess").style.color = "green;";
          // document.querySelector(".registerSuccess").style.textAlign = "center";
          // document.querySelector(".registerSuccess").style.fontSize = "18px";
      }
      // if(res.data.status == "failed"){
      //     document.querySelector(".registerSuccess").innerHTML =
      //       "Your pin validation not successful. Please Try Again!.";
      //     document.querySelector(".registerSuccess").style.display = "block";
      //     document.querySelector(".registerSuccess").style.color = "red;";
      //     document.querySelector(".registerSuccess").style.textAlign = "center";
      //     document.querySelector(".registerSuccess").style.fontSize = "18px";
      // }
    });
  };

  const [otpSuccessStatus, setOtpSuccessStatus] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (otpSuccessStatus === true) {
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
    type: 2,
    phone: forgotPhoneData,
  };

  const resendOTP = () => {
    setMinutes(2);
    setSeconds(0);

    axios.post(baseURL + "/resend", resendOtpData).then((res) => {
      console.log(res);
    });
  };

  const changePasswordData = {
    // toke: ,
    // password: 
  }
  const handlePasswordChange = () => {
    axios.post(baseURL + "/changePassword", )
  }
  return (
    <>
      <div className="container-fluid">
        <div className="login-container">
          <div className="login-form-container">
            <div className=" imgback">
              <img src={loginBackgroundImg} alt="" />

              <h4>
                <span>Welcome To</span> <br /> BPP Shop Agent Panel
              </h4>
            </div>
            <div className="loginForm">
              <div className="loginFormContent">
                <div className="login-title">
                  <h4>Login</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* <input
                  type="email"
                  placeholder="Email"
                  name="agent_email"
                  onChange={handleChange}
                  value={data.agent_email}
                />
                <br /> */}
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="agent_mobile_number"
                    onChange={handleChange}
                    value={data.agent_mobile_number}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                  />

                  {error && <div className="text-danger">{error}</div>}
                  <div className="d-flex justify-content-between mt-3">
                    <button type="submit">Login</button>
                    <p className="forgotPass" onClick={forgotPassHandler}>
                      Forgot Your Password?
                    </p>
                  </div>
                  <p className=" mt-4">
                    Need an Account?{" "}
                    <Link to="/signup">
                      <span style={{ color: "#16a0da", fontWeight: "600" }}>
                        Sign up
                      </span>
                    </Link>
                  </p>
                </form>
              </div>
              <div className="forgot_pass_container">
                <div className="forgot_pass_content">
                  <div>
                    <h4>Forgot Password</h4>
                    <br />
                    <div className="forgot_input-container">
                      <label for="">Enter Phone Number</label>
                      <br />
                      <input
                        type="number"
                        name="phone"
                        placeholder="Enter Phone Number"
                        onChange={(e) => handleForgotChange(e.target.value)}
                        // value={forgotData.phone}
                      />

                      <br />
                      <br />
                      <button type="" onClick={forgotPhoneNumberSend}>
                        Send
                      </button>
                    </div>
                    <p className=" mt-4">
                      Need an Account?{" "}
                      <Link to="/signup">
                        <span style={{ color: "#16a0da", fontWeight: "600" }}>
                          Sign up
                        </span>
                      </Link>
                    </p>
                    <span>Back To sign in</span>
                  </div>
                </div>
                <div className="forgot_otp-container">
                  <h4>Verification</h4>
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

                      {seconds > 0 || minutes > 0 ? null : (
                        <button
                          style={{
                            color: "#ffff",
                          }}
                          onClick={resendOTP}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                  <p>Enter Verification Code</p>
                  <div className={styles.otp_form_container} id="otpInput">
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
                          onFocus={(e) => e.target.select()}
                        />
                      );
                    })}
                  </div>
                  <button onClick={otpSubmit} type="submit">
                    {" "}
                    Verify OTP
                  </button>
                </div>


                {/* password change */}

                <div className="changePassword-container">
                  <h4>New Password</h4>

                  <div className="changePass-form-container">
                    <form>
                      <input type="text" name="newPassword"  placeholder="New Password" onChange={(e) => handlePasswordChange(e.target.value)}/>

                      <input type="text" name="confirmPassword"  placeholder="Confirm Password"/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
