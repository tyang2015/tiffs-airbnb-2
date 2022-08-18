import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./ProfileButton.css"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal";
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // added here
  const [signupModal, setSignupModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)

  // added here:
  const handleDemoLogin = (e) => {
    dispatch(sessionActions.login({ email: "tiffanyang2015@gmail.com", password:"baludf"}));
    return
  }

  const openMenu = () => {
    // added here
    setProfileDropdown(true)

    if (showMenu) return;
    setShowMenu(true);

  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    // document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // const handleLoginClick = (e) =>{
  //   setSignupModal(false)
  //   setLoginModal(true)
  //   console.log('inside loginclick handler:',loginModal)
  //   return
  // }

  // const handleSignUpClick = (e)=>{
  //   setSignupModal(true)
  //   setLoginModal(false)
  //   console.log('inside signup click handler:', signupModal )
  //   return
  // }

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", height: "27px", width: "27px", fill: "rgb(121, 121, 121)"}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
      </button>
        {showMenu && (
          <>
            <div style={{width:"100vw", height: "100vh", zIndex:"100", position: "absolute", top:"0"}} onClick={()=>{setShowMenu(false)}}/>
            <ul className="profile-dropdown" style={{zIndex: "101"}}>
              <li>{user? user.email: "welcome guest"}</li>

              {/* <li>
                <LoginFormModal className="session-link"/>
              </li>
              <li>
                <SignupFormModal className="session-link"/>
              </li> */}
              {/* <h3>Log in</h3> */}
              {/* <h3>Sign up</h3> */}
              {user? (
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              ) : (
                <>
                  <li>
                    {/* <button onClick={()=> setLoginModal(!loginModal)} className='session-link'>Log In</button>
                    {loginModal && (<LoginFormModal className="session-link"/>)} */}
                    <LoginFormModal className="session-link" setLoginModal={setLoginModal} loginModal={loginModal} setSignupModal={setSignupModal} signupModal={signupModal}/>
                    {/* {loginModal && (<LoginFormModal className="session-link" setLoginModal={setLoginModal} loginModal={loginModal}/>)} */}
                  </li>
                  <li>
                    {/* <button onClick={()=> setSignupModal(!signupModal)} className='session-link'>Sign Up</button>
                    {signupModal && (<SignupFormModal className="session-link"/>)} */}
                    <SignupFormModal className="session-link" setSignupModal={setSignupModal} signupModal={signupModal} setLoginModal={setLoginModal} loginModal={loginModal}/>
                  </li>
                  <button onClick={handleDemoLogin} className="session-link">Demo User</button>
                </>
              )}
            </ul>
            </>
        )}
    </>
  );
}

export default ProfileButton;
