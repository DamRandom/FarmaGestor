import React, { useState } from 'react';
import '../css/addButton.css';
import { useForm } from "react-hook-form";

function UpdateButton({ itemType, item, camposForm }) {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, usuario] = useState(null);

  const { register, handleSubmit } = useForm({
    defaultValues: item
  });

  const onSubmit = handleSubmit(async data => {
    console.log('Updated item:', { ...item, ...data });

    setShowModal(false);
  });

  return (
    <>
      <button className='add-button' onClick={() => setShowModal(true)}>Modificar {itemType}</button>
      {showModal &&
        <div className="modal-overlay">
          <div className="modal">
            <label className='modal-title'>Actualizar {itemType}</label>
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
                  {...register(campo.nombre, { required: true })}
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