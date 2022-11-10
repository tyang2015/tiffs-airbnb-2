import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';
import { ModalContext } from '../Modal';
import "./CreateSpotModal.css"

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal" style={{zIndex: "205"}} >
      <div id="modal-background" className='create-spot-modal-background' style={{zIndex: "201"}} onClick={onClose} />
      <div id="modal-content" style={{zIndex: "205" }} className='create-spot-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
