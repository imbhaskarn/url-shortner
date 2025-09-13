import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-100">
      <div className="modal-content bg-gray-100">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};



export const ModalContent = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-100">
      <div className="modal-content bg-gray-100">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};



export const ModalHeader = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-100">
      <div className="modal-content bg-gray-100">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};


export const ModalBody = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-100">
      <div className="modal-content bg-gray-100">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};


export const ModalFooter = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-100">
      <div className="modal-content bg-gray-100">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
