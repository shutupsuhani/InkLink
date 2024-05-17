import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { motion } from "framer-motion";

const Register = () => {
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
              <h2>Register</h2>
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
                <div className="NameInputField">
                  <div className="Inputfield">
                    <label className="inputlabel">First Name:</label>
                    <div className="inputwrapper">
                      <input
                        className="inputarea"
                        type="text"
                        placeholder="First Name"
                        required
                      />
                      <FontAwesomeIcon icon={faUser} className="inputicon" />
                    </div>
                  </div>
                  <div className="Inputfield">
                    <label className="inputlabel">Last Name:</label>
                    <div className="inputwrapper">
                      <input
                        className="inputarea"
                        type="text"
                        placeholder="Last Name"
                        required
                      />
                      <FontAwesomeIcon icon={faUser} className="inputicon" />
                    </div>
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
                  Register
                </button>
                <p>Already Have an Account? Login</p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Register;
