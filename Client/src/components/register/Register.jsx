import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { motion } from "framer-motion";


const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
      if (response && response.data) {
        console.log('Signup successful:', response.data);
        toast.success('Signup successful!');
        setFormData({
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: ''
        });
      } else {
        console.error('Error signing up: Invalid response format');
        toast.error('Error signing up: Invalid response format');
      }
    } catch (err) {
      console.error('Error signing up:', err.response ? err.response.data.message : err.message);
      toast.error(err.response ? err.response.data.message : err.message);
    }
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
              <form className="forminput" onSubmit={handleSubmit}>
                <div className="Inputfield">
                  <label className="inputlabel">Email:</label>
                  <div className="inputwrapper">
                    <input className="inputarea" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <FontAwesomeIcon icon={faEnvelope} className="inputicon" />
                  </div>
                </div>
                <div className="NameInputField">
                  <div className="Inputfield">
                    <label className="inputlabel">First Name:</label>
                    <div className="inputwrapper">
                      <input className="inputarea" type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
                      <FontAwesomeIcon icon={faUser} className="inputicon" />
                    </div>
                  </div>
                  <div className="Inputfield">
                    <label className="inputlabel">Last Name:</label>
                    <div className="inputwrapper">
                      <input
                        className="inputarea"
                        type="text"
                        name="lastname"
                        placeholder="Last Name" value={formData.lastname} onChange={handleChange}
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
                      name="username"
                      placeholder="Username" value={formData.username} onChange={handleChange}
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
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password} onChange={handleChange}
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
                <p>Already Have an Account?Login</p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>

      <ToastContainer />
    </>
  );
};

export default Register;
