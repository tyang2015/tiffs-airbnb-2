import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';
import { ModalContext } from '../Modal';
// import "./DeleteReviewModal.css"

// borrows from review modal
export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal" style={{zIndex: "100"}}>
      <div id="modal-background" className='delete-review-modal-background' onClick={onClose} />
      <div id="modal-content" className='delete-review-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
