import { useContext, useState } from "react";
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
  const [forgotPhoneData, setForgotPhoneData] = useState('');
  const forgotData = {
    type: 2,
    phone: forgotPhoneData
  };

  const forgotPassHandler = () => {
    document.querySelector(".loginFormContent").style.display = "none";
    document.querySelector(".forgot_pass_container").style.display = "block";
  };
  
  const handleForgotChange = (data) => { 
    setForgotPhoneData(data);
  };

  const forgotPhoneNumberSend = () => {
    axios.post(baseURL + "/forgot", forgotData)
    .then(res => {
      console.log(res)
      if(res.data.status == "success"){
        document.querySelector('.forgot_pass_content').style.display = "none"
        document.querySelector('.forgot_otp-container').style.display = "block"
      }
    })
  }

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleOtpChange = (element, index) => {
    if(isNaN(element.value)) return false;

    setOtp([...otp.map((item, indx) => (indx === index) ? element.value : item)]);

    // focus next input
    if(element.nextSibling){
      element.nextSibling.focus();
    }
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
                      <button type="" onClick={forgotPhoneNumberSend}>Send</button>
                      
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
                <p>Enter Verification Code</p>
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
                <button  type="submit"> Verify OTP</button>
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
