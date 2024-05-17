import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import { motion } from "framer-motion";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="registerContainer">
          <div className="left">
            <div className="signupcontainer">
              <h2>Login</h2>
              <form className="forminput">
                <div className="Inputfield">
                  <label className="inputlabel">Email:</label>
                  <div className="inputwrapper">
                    <input
                      className="inputarea"
                      type="email"
                      placeholder="Email"
                      required
                    />
                    <FontAwesomeIcon icon={faEnvelope} className="inputicon" />
                  </div>
                </div>
                <div className="Inputfield">
                  <label className="inputlabel">Username:</label>
                  <div className="inputwrapper">
                    <input
                      className="inputarea"
                      type="text"
                      placeholder="Username"
                      required
                    />
                    <FontAwesomeIcon icon={faUser} className="inputicon" />
                  </div>
                </div>
                <div className="Inputfield">
                  <label className="inputlabel">Password:</label>
                  <div className="inputwrapper">
                    <input
                      className="inputarea"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      required
                    />
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                      className="inputicon"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <button type="submit" className="registerbutton">
                  Login
                </button>
                <p>Don't Have An Account? Register</p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
