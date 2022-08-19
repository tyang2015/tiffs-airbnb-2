import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal({setLoginModal, loginModal}) {
  // const [showModal, setShowModal] = useState(false);
  const handleLogin = e =>{
    // setTrigger(false)
    setLoginModal(true)
    // setShowModal(true)
    // setSignupModal(false)
    // setShowMenu(false)
    return
  }

  return (
    <>
      {/* <button onClick={handleLogin} className='session-link'>Log In</button> */}
      (
        <Modal onClose={()=> setLoginModal(false)}>
          <LoginForm setLoginModal={setLoginModal} loginModal={loginModal}/>
        </Modal>
      )
    </>
  );
}

export default LoginFormModal;
