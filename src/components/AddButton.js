import React, { useState, useEffect } from 'react';
import '../css/addButton.css';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { postDoctores } from '../api/doctor';

function AddButton({ itemType, formFields }) {

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
    if(itemType === "Doctor"){
      console.log(data); // Log form data
      await postDoctores(data)
    }
    setShowModal(false);  // Close modal and show notification
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);     // Hide notification after 6 seconds
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
          {formFields.map((field, index) => (
            <input
              key={index}
              className='form-inputs'
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              autoComplete='off'
              {...register(field.name, { required: true })}
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
