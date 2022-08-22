import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './SignupForm.css'
import { Redirect } from "react-router-dom";

function SignupForm({setSignupModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  // added here
//   const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .then(
          setSignupModal(false)
        )
        .catch(async (res) => {
          const data = await res.json();
        //   console.log('data')
          // console.log('data from signup form:', data)
          // i do get the right errors, but it is an object... convert to array
          if (data && data.errors) setErrors(Object.values(data.errors));
          // console.log('errors on signup:', errors)
          // console.log('session user,',sessionUser)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="parent-main-container-before-form">
            <h2> Welcome to Tiff's Airbnb </h2>
            <ul className='validation-errors'>
                {errors.length>0 && (errors.map((error, idx) => <li key={idx}>{error}</li>))}
            </ul>
            <div className={`signup-email-container form-group first`}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control signup"
                    placeholder= 'Email'
                />
            </div>
            <div className={`signup-firstname-container form-group`}>
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="form-control signup"
                placeholder = 'firstName'
                />
            </div>
            <div className={`signup-lastname-container form-group`}>
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="form-control signup"
                placeholder = "lastName"
                />
            </div>
            <div className={`signup-password-container form-group`}>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password"
                className="form-control signup"
                />
            </div>
            <div className={`signup-confirm-password-container form-group last`}>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder='confirm password'
                className="form-control signup"
                />
            </div>
            <button type="submit" className="submit-button login">Sign Up</button>
        </div>
    </form>
    );
}

export default SignupForm;
