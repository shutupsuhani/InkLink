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
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function PasswordChecker(event) {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!_@.#$%^&*])");
    const length = new RegExp("(?=.{8,})");
    const value = event.target.value;

    // Checking each criteria and updating corresponding state
    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));

    // Setting the form data
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

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
                      onBlur={PasswordChecker} // Call PasswordChecker onBlur
                    />
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                      className="inputicon"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                  {/* Feedback for password criteria */}
                  {lowerValidated ||
                  upperValidated ||
                  numberValidated ||
                  specialValidated ||
                  lengthValidated ? (
                    <div style={{ color: "red", fontFamily: "monospace" }}>
                      {!lowerValidated && (
                        <p>
                          Password must contain at least one lowercase letter
                        </p>
                      )}
                      {!upperValidated && (
                        <p>
                          Password must contain at least one uppercase letter
                        </p>
                      )}
                      {!numberValidated && (
                        <p>Password must contain at least one number</p>
                      )}
                      {!specialValidated && (
                        <p>
                          Password must contain at least one special character
                        </p>
                      )}
                      {!lengthValidated && (
                        <p>Password must be at least 8 characters long</p>
                      )}
                    </div>
                  ) : null}
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
