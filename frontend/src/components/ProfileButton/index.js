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

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
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
                    <LoginFormModal setShowMenu={setShowMenu} showMenu={showMenu} trigger={showMenu} setTrigger= {setShowMenu} className="session-link" setLoginModal={setLoginModal} loginModal={loginModal} setSignupModal={setSignupModal} signupModal={signupModal}/>
                    {/* {loginModal && (<LoginFormModal className="session-link" setLoginModal={setLoginModal} loginModal={loginModal}/>)} */}
                  </li>
                  <li>
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
