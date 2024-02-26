import React, { useState, useEffect, useRef } from 'react';
import '../css/addButton.css';
import { useForm } from "react-hook-form";

function UpdateButton({ itemType, item, formFields }) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const { register, handleSubmit } = useForm({
    defaultValues: item
  });

  const onSubmit = handleSubmit(async data => {
    console.log('Updated item:', { ...item, ...data });
    setShowModal(false);
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <>
      <button className='add-button' onClick={() => setShowModal(true)}>Modificar {itemType}</button>
      {showModal &&
        <div className="modal-overlay">
          <div ref={modalRef} className="modal">
            <label className='modal-title'>Actualizar {itemType}</label>
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
                  {...register(field.name, { required: true })}
                />
              ))}
              <button className='modal-submit-addButton' type="submit"> {itemType} Modificar</button>
            </form>
          </div>
        </div>
      }
    </>
  );
}

export default UpdateButton;
