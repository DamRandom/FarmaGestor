import React, { useState, useEffect } from 'react';
import '../css/addButton.css';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";

function AddButton({ itemType, camposForm }) {
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);
  // State for notification visibility
  const [showNotification, setShowNotification] = useState(false);
  // Form management using react-hook-form
  const { register, errors, handleSubmit, reset } = useForm();

  // Effect to reset form when modal opens
  useEffect(() => {
    if (showModal) {
      reset(); // Reset the form each time modal is opened
    }
  }, [showModal, reset]);

  // Function to handle form submission
  const onSubmit = handleSubmit(async data => {
    console.log(data); // Log form data
    // Close modal and show notification
    setShowModal(false);
    setShowNotification(true);
    // Hide notification after 6 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  });

  return (
    <>
      <button className='add-button' onClick={() => setShowModal(true)}>Añadir {itemType}</button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel={`Registrar ${itemType}`}
        className="modal"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <label className='modal-title'>Registrar {itemType}</label>
        <button className="close-button" onClick={() => setShowModal(false)}>
          <span className="X"></span>
          <span className="Y"></span>
          <div className="close">Cerrar</div>
        </button>
        <form className='form' onSubmit={onSubmit}>
          {camposForm.map((campo, index) => (
            <input
              key={index}
              className='form-inputs'
              type={campo.tipo}
              placeholder={campo.placeholder}
              name={campo.nombre}
              autoComplete='off'
              {...register(campo.nombre, { required: true })}
            />
          ))}
          <button className='modal-submit-addButton' type="submit"> Añadir {itemType}</button>
        </form>
      </Modal>
      {showNotification && (
        <div className="notification">
          El {itemType} ha sido satisfactoriamente añadido
        </div>
      )}
    </>
  );
}

export default AddButton;
