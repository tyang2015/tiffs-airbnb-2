import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // added here
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    setErrors([]);
    dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        // console.log('data msg logged in form:', data.message)
        // if (data.message == 'Invalid credentials'){
        //   setErrors(data.message)
        //   console.log('errors:', errors)
        // }
        // console.log('data:', data)
        if (data && data.errors) setErrors(data.errors);
        console.log('Data errors:', data.errors)
        // if (data)
        // console.log('data errors:', data.errors)
      }
    );
    setHasSubmitted(false)
    return
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="parent-main-container-before-form">
          <h2> Welcome to Tiff's Airbnb </h2>
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
