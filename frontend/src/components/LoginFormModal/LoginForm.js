import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2> Welcome to Tiff's Airbnb </h2>
        <div className="parent-main-container-before-form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login-main-container" >
            <div className={`login-email-container form-group first`}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control login"
                  required
                  placeholder= 'Email'
                />
            </div>
            <div className={`login-password-container form-group last`}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control login"
                placeholder= 'Password'
                required
              />
            </div>
            {/* <div className={`submit-container`}> */}
              <button type="submit" className="submit-button login">Log In</button>
            {/* </div> */}
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
