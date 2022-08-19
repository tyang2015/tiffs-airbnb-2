import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./ProfileButton.css"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal";
function ProfileButton({ user, signupModal, setSignupModal, loginModal, setLoginModal}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // LIFT UP THE STATE TO NAVIGATION COMPONENT
  // const [signupModal, setSignupModal] = useState(false)
  // const [loginModal, setLoginModal] = useState(false)
  // const [profileMenu, setProfileMenu] = useState(false)

  // added here:
  const handleDemoLogin = (e) => {
    dispatch(sessionActions.login({ email: "tiffanyang2015@gmail.com", password:"baludf"}));
    return
  }

  const openMenu = () => {
    // setProfileDropdown(true)
    // setProfileMenu(true)

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

  const handleLogin = e =>{
    setLoginModal(true)
    setShowMenu(false)
  }
  const handleSignup = e =>{
    setSignupModal(true)
    setShowMenu(false)
  }

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", height: "27px", width: "27px", fill: "rgb(121, 121, 121)"}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
      </button>
        {showMenu && (
          <>
            <div style={{width:"250%", height: "100vh", zIndex:"100", position: "absolute", top:"0"}} onClick={()=>{setShowMenu(false)}}/>

            <ul id="menu" className="profile-dropdown" style={{zIndex: "101"}}>
              <li>{user? user.email: "welcome guest"}</li>
              {user? (
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              ) : (
                <>
                  <li>
                    <button onClick={handleLogin}>Log In</button>
                    <button onClick={handleSignup}>Sign Up</button>
                    {/* <LoginFormModal setShowMenu={setShowMenu} showMenu={showMenu} trigger={showMenu} setTrigger= {setShowMenu} className="session-link" setLoginModal={setLoginModal} loginModal={loginModal} setSignupModal={setSignupModal} signupModal={signupModal}/> */}
                    {/* {loginModal && (<LoginFormModal className="session-link" setLoginModal={setLoginModal} loginModal={loginModal}/>)} */}
                  </li>
                  {/* <li>
                    <SignupFormModal className="session-link" setSignupModal={setSignupModal} signupModal={signupModal} setLoginModal={setLoginModal} loginModal={loginModal}/>
                  </li> */}
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
