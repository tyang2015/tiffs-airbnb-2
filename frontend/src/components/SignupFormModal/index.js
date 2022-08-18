import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function SignupFormModal({setLoginModal, loginModal, signupModal, setSignupModal}) {
  const [showModal, setShowModal] = useState(false);
  const handleSignup = e => {
    setShowModal(true)
    setSignupModal(true)
    setLoginModal(false)
  }
  return (
    <>
    {/* changed here */}
      <button onClick={handleSignup} className='session-link'>Sign Up</button>
      {showModal && !loginModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
