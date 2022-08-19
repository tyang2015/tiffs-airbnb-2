import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({loginModal, setLoginModal}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // added here
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // added here
    // console.log('inside handle submit')
    setHasSubmitted(true)
    setErrors([]);
    let response =  dispatch(sessionActions.login({ email, password }))
    .then(
      setLoginModal(false)
    )
    .catch(
      async (res) => {
        const data = await res.json();
        console.log('data:', data)
        if (data && data.errors) setErrors(data.errors);

      }
    );
    // if (response.ok){
    //   console.log('success login!')
    //   setLoginModal(false)
    //   // console.log('data from dispatch:', finalData)

    // }

    // setHasSubmitted(false)
    // added here
    // return () =>
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="parent-main-container-before-form">
          <h2> Welcome to Tiff's Airbnb </h2>
          <ul className='validation-errors'>
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
            <button type="submit" className="submit-button login">Log In</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
