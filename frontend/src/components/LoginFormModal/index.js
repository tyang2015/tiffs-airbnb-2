import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal({setLoginModal, loginModal, signupModal, setSignupModal}) {
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
          <LoginForm />
        </Modal>
      )
    </>
  );
}

export default LoginFormModal;
