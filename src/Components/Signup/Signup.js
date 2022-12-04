import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import loginBackgroundImg from "../../assets/image/bpp_icon.png";
import { baseURL } from './../../BaseUrl/BaseUrl';

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
      const url = baseURL+"/register";
      axios.post(url, data)
      .then(res => {
        console.log(res)

        if(res.data.status == "success"){

          document.querySelector('.registerSuccess').innerHTML = "Mr." + " " + res.data.data.name + " " + " <br> your register successful as agent. Please Sign in."

          document.querySelector('#form-container').style.display = 'none'
          document.querySelector('.registerSuccess').style.display = 'block'
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
          <form id="form-container" className={styles.form_container} onSubmit={handleSubmit}>
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

          <div className=" d-flex justify-content-center text-center">
            <h5 style={{width: '80%', display: "flex", justifyContent: "center" }} className="registerSuccess"></h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
