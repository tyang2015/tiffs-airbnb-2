import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal({showMenu, setShowMenu, trigger, setTrigger, setLoginModal, loginModal, signupModal, setSignupModal}) {
  const [showModal, setShowModal] = useState(false);
  console.log('loginModal in modal component:', loginModal)
  // added here
  const handleLogin = e =>{
    // setTrigger(false)
    setLoginModal(true)
    setShowModal(true)
    setSignupModal(false)
    // setShowMenu(false)
    return
  }
  // useEffect(()=>{
  // }, [])
  console.log('show modal:', showModal)
  console.log('login modal:', loginModal)
  return (
    <>
      <button onClick={handleLogin} className='session-link'>Log In</button>
      {showModal && loginModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
