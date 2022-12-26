import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import styles from "../Signup/Signup.module.css";
import loginBackgroundImg from "../../assets/image/bpp_icon.png";
import { UserContext } from "../../App";
import { baseURL } from "./../../BaseUrl/BaseUrl";
import Signup from "../Signup/Signup";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState("");

  // Login Start..................
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    // agent_email: "",
    agent_mobile_number: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loginFailedMassage, setLoginFailedMassage] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = baseURL + "/login";

      await axios.post(url, data).then((res) => {
        if (res.data.status == "success") {
          if (res.data.is_verified == 1) {
            setLoggedInUser(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isLoggedIn", true);
            let from = location?.state?.from?.pathname || "/";
            navigate(from, { replace: true });

          } else {
            document.querySelector(".forgot_pass_container").style.display =
              "block";
            document.querySelector(".forgot_pass_content").style.display =
              "none";
            document.querySelector(".forgot_otp-container").style.display =
              "none";
            document.querySelector(".verify-container").style.display = "block";
            document.querySelector(".loginFormContent").style.display = "none";

            setOtpSuccessStatus(true);
            signUpVerifyPhoneNumberSend(e);
          }
        }
        if (res.data.status == "failed") {
          setLoginFailedMassage(res.data.message)
        } else {
          setError(error.response.data.message);
        }
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
  // Login end..........

  // forgot password start.................
  const [forgotPhoneData, setForgotPhoneData] = useState("");
  const forgotData = {
    type: 2,
    phone: forgotPhoneData,
  };

  const forgotPassHandler = () => {
    document.querySelector(".loginFormContent").style.display = "none";
    document.querySelector(".forgot_pass_container").style.display = "block";
    document.querySelector(".forgot_pass_content").style.display = "block";
  };

  const backToSignInHandler = () => {
    document.querySelector(".loginFormContent").style.display = "block";
    document.querySelector(".forgot_pass_container").style.display = "none";
  };

  const handleForgotChange = (data) => {
    setForgotPhoneData(data);
  };

  const forgotPhoneNumberSend = (e) => {
    e.preventDefault();

    axios.post(baseURL + "/forgot", forgotData).then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        document.querySelector(".forgot_pass_content").style.display = "none";
        document.querySelector(".forgot_otp-container").style.display = "block";

        setOtpSuccessStatus(true);
      }
      if (res.data.status == "failed") {
        document.querySelector(".deactivate_status").innerHTML =
          "Your account is not active. Please verify your account.";
        document.querySelector(".deactivate_status").style.color = "red";
        document.querySelector(".deactivate_status").style.fontSize = "13px";

        setOtpSuccessStatus(false);
      }
    });
  };

  const [otpExpairStatus, setOtpExpairStatus] = useState("");

  const signUpVerifyPhoneData = {
    type: 1,
    phone: data.agent_mobile_number,
  };

  const signUpVerifyPhoneNumberSend = (e) => {
    e.preventDefault()

    axios.post(baseURL + "/resend", signUpVerifyPhoneData).then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        document.querySelector(".forgot_pass_content").style.display = "none";
        document.querySelector(".forgot_otp-container").style.display = "none";
        document.querySelector(".verify-container").style.display = "block";

        setOtpSuccessStatus(true);
      }
      if (res.data.status == "failed") {
        setOtpExpairStatus(res.data.message);

        // document.querySelector(".forgot_otp-container").style.display = "none";
        // document.querySelector('.deactivate_status').innerHTML = "Your account is not active. Please verify your account.";
        document.querySelector(".deactivate_status").innerHTML =
          "Your account is not active. Please verify your account.";
        document.querySelector(".deactivate_status").style.color = "red";
        document.querySelector(".deactivate_status").style.fontSize = "13px";


        // document.querySelector(".verify-container").style.display = "none";

        setOtpSuccessStatus(false);
      }
    });
  };

  // OTP input validation and verify start...................
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

  const [otpVerifyToken, setOtpVerifyToken] = useState("");
  const otpSubmit = (e) => {
    e.preventDefault();

    axios.post(baseURL + "/verify", verifyData).then((res) => {
      if (res.data.status === "success") {
        setOtpVerifyToken(res.data.data.token);
        document.querySelector(".forgot_otp-container").style.display = "none";
        document.querySelector(".changePassword-container").style.display =
          "block";
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
  const [minutess, setMinutess] = useState(2);
  const [secondss, setSecondss] = useState(0);

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

  useEffect(() => {
    if (otpSuccessStatus === true) {
      const interval = setTimeout(() => {
        if (secondss > 0) {
          setSecondss(secondss - 1);
        }

        if (secondss === 0) {
          if (minutess === 0) {
            clearInterval(interval);
          } else {
            setSecondss(59);
            setMinutess(minutess - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [otpSuccessStatus, secondss, minutess]);
  // OTP input validation and verify end...................

  // OTP resend start...........
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

  const resendSignupOtpData = {
    type: 1,
    phone: data.agent_mobile_number,
  };

  const resendSignupOTP = () => {
    setMinutess(2);
    setSecondss(0);

    axios.post(baseURL + "/resend", resendSignupOtpData).then((res) => {
      console.log(res);
    });
  };
  // OTP resend end..........

  // change password start............
  const [changePassInput, setChangePassInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassError, setChangePassError] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const onInputPasswordChange = (e) => {
    const { name, value } = e.target;
    setChangePassInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setChangePassError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "newPassword":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          }
          if (value > 0 && value < 8) {
            stateObj[name] = "Password should be minimum 8 characters.";
          } 
          if(value >= 8){
            stateObj[name] = "";
          }else if (
            changePassInput.confirmPassword &&
            value !== changePassInput.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = changePassInput.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (
            changePassInput.newPassword &&
            value !== changePassInput.newPassword
          ) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const [updatePasswordMessage, setUpdatePasswordMessage] = useState("");
  const changePasswordData = {
    token: otpVerifyToken,
    password: changePassInput.newPassword,
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();

    axios.post(baseURL + "/changePassword", changePasswordData).then((res) => {
      if (res.data.status == "success") {
        document.querySelector(".changePassword-container").style.display =
          "none";
        document.querySelector(
          ".password-update-message-container"
        ).style.display = "block";

        setUpdatePasswordMessage(res.data.message);
      }
    });
  };

  const GoToSignInAfterChangePass = () => {
    document.querySelector(".loginFormContent").style.display = "block";
    document.querySelector(".password-update-message-container").style.display =
      "none";
  };

  // Change Password end.......................

  const signUpVerifyData = {
    type: 1,
    phone: data.agent_mobile_number,
    pin: otp.join(""),
  };

  // console.log(signUpVerifyData)

  const signupOtpSubmit = (e) => {
    e.preventDefault();

    console.log("clicked");

    axios.post(baseURL + "/verify", signUpVerifyData).then((res) => {
      console.log( res);

      if (res.data.status === "success") {
        // setOtpVerifyToken(res.data.data.token)
        document.querySelector(".verify-container").style.display = "none";
        document.querySelector(".verifySuccess-msg-container").style.display ="block";
        
        document.querySelector(".verifySuccess-msg").innerHTML = "Your OTP Verification Successful.";
      }
      if(res.data.status == "failed"){
        document.querySelector(".verifySuccess-msg").innerHTML = "Your OTP Verification is not Successful. please try again.";
          
          document.querySelector(".verifySuccess-msg").style.color = "red;";
          document.querySelector(".verifySuccess-msg").style.textAlign = "center";
      }
    });
  };


  const signInAfterVerifyHandler = () => {
    document.querySelector(".loginFormContent").style.display ="block";
    document.querySelector(".verifySuccess-msg-container").style.display ="none";
  }

  const [passwordType, setPasswordType] = useState("password");
  
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
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
                    required
                  />
                  <br />
                  <div>
                  <input
                    type={passwordType} 
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                  />
                  <span className="passwordToggleBtn" onClick={togglePassword}>
                    { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                  </span>
                  </div>

                  {error && <div className="text-danger">{error}</div>}
                  <small style={{color: "red"}}>{loginFailedMassage}</small>
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
                  <h4>Forgot Password</h4>
                  <div className="forgot_input-container">
                    <form onSubmit={forgotPhoneNumberSend}>
                      <input
                        type="number"
                        name="phone"
                        placeholder="Enter Phone Number"
                        onChange={(e) => handleForgotChange(e.target.value)}
                        required
                      />

                      <br />
                      <small className="deactivate_status"></small>
                      <br />
                      <button type="submit">Send</button>
                    </form>
                    <p className=" mt-3">
                      Need an Account?{" "}
                      <Link to="/signup">
                        <span style={{ color: "#16a0da", fontWeight: "600" }}>
                          Sign up
                        </span>
                      </Link>
                    </p>
                    <span onClick={backToSignInHandler}>Back To sign in</span>
                  </div>
                </div>
                <div className="forgot_otp-container">
                  <h4>Verification</h4>
                  
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
                  <br/>

                  <div className="resendTimer">
                    <div className="countdown-text">
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Resend button will be activated in: {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <p>Didn't receive the code?</p>
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
                </div>
                <div className="verify-container">
                  <h4>Verification</h4>
                  {/* <Signup/> */}
                  
                  <div className="otpExpairStatus-container">
                    <p>{otpExpairStatus}</p>
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
                  <button onClick={signupOtpSubmit} type="submit">
                    {" "}
                    Verify OTP
                  </button>
                  <br/>
                  <div className="resendTimer">
                    <div className="countdown-text">
                      {secondss > 0 || minutess > 0 ? (
                        <p>
                          Resend button will be activated in:{" "}
                          {minutess < 10 ? `0${minutess}` : minutess}:
                          {secondss < 10 ? `0${secondss}` : secondss}
                        </p>
                      ) : (
                        <p>Didn't receive the code?</p>
                      )}

                      {secondss > 0 || minutess > 0 ? null : (
                        <button
                          style={{
                            color: "#ffff",
                          }}
                          onClick={resendSignupOTP}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" d-flex justify-content-center text-center">
                  <div className="verifySuccess-msg-container">
                    <h6 className="verifySuccess-msg"></h6>
                    <h5 className="gotoSignIng">
                      Please <span style={{cursor: "pointer"}} onClick={signInAfterVerifyHandler}>sign in</span>
                    </h5>
                  </div>
                </div>

                {/* password change */}

                <div className="changePassword-container">
                  <h4>Create New Password</h4>

                  <div className="changePass-form-container">
                    <form onSubmit={handleSubmitPasswordChange}>
                      <div>
                        <input
                          type="passwordType"
                          name="newPassword"
                          placeholder="Enter New Password"
                          value={changePassInput.password}
                          onChange={onInputPasswordChange}
                          onBlur={validateInput}
                          required
                        ></input>
                        <span className="passwordToggleBtn" onClick={togglePassword}>
                          { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                        </span>
                      </div>
                      {changePassError.newPassword && (
                        <span className="err text-danger" style={{fontSize: "14px"}}>
                          {changePassError.newPassword}
                        </span>
                      )}

                      <div>
                        <input
                          type="passwordType"
                          name="confirmPassword"
                          placeholder="Enter Confirm Password"
                          value={changePassInput.confirmPassword}
                          onChange={onInputPasswordChange}
                          onBlur={validateInput}
                          required
                        ></input>
                        <span className="passwordToggleBtn" onClick={togglePassword}>
                            { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                          </span>
                      </div>
                      {changePassError.confirmPassword && (
                        <span className="err text-danger">
                          {changePassError.confirmPassword}
                        </span>
                      )}

                      <br />
                      <br />
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                </div>

                {/* password updated  */}
                <div className="password-update-message-container ">
                  <p>Your {updatePasswordMessage}.</p>
                  <small>
                    Please{" "}
                    <span onClick={GoToSignInAfterChangePass}>sign in</span>
                  </small>
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
