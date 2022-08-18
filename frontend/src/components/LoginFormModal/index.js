import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal({setLoginModal, loginModal, signupModal, setSignupModal}) {
  const [showModal, setShowModal] = useState(false);
  console.log('loginModal in modal component:', loginModal)
  // added here
  const handleLogin = e =>{
    setLoginModal(true)
    setShowModal(true)
    setSignupModal(false)
    return
  }

  return (
    <>
    {/* changed here */}
      <button onClick={handleLogin} className='session-link'>Log In</button>
      {showModal && !signupModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
