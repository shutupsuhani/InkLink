import { useState, useContext,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context/AuthContext.jsx";
import { loginCall } from "../../apiCall.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
   const email=useRef();
   const username=useRef();
   const password=useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const navigate=useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginCall({ email: email.current.value, username: username.current.value, password: password.current.value }, dispatch);
      console.log("Logged in successfully");
    //  localStorage.setItem('user', JSON.stringify(username.current.value));
      navigate("/"); 
    } catch (error) {
      console.error("Login failed:", error.message); // Handle login failure
    }
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
              <form className="forminput" onSubmit={handleSubmit}>
                <div className="Inputfield">
                  <label className="inputlabel">Email:</label>
                  <div className="inputwrapper">
                    <input
                      className="inputarea"
                      type="email"
                      placeholder="Email"
                      ref={email}
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
                      ref={username}
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
                       ref={password}
                      required
                    />
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                      className="inputicon"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="registerbutton" disabled={isFetching}>
                  {isFetching ? <img src="./loading.gif" width={15} height={15}/> : "Login"}
                </button>
                <p>Do not Have An Account? <Link to='/register'>Register</Link></p>
                
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;