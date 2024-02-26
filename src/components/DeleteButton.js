import React, { useState, useEffect } from 'react';
import '../css/deleteButton.css';

function DeleteButton({ item, setItem, selectedItem }) {

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to control visibility of delete button
  const [buttonVisible, setButtonVisible] = useState(false);

  // Effect to update button visibility based on selected objects
  useEffect(() => {
    setButtonVisible(selectedItem.length > 0);
  }, [selectedItem]);

  // Function to handle delete button click
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  // Function to confirm deletion
  const handleConfirmDelete = () => {
    const updatedObjeto = item.filter((_, index) => !selectedItem.includes(index));
    setItem(updatedObjeto);
    setShowModal(false);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className={`delete-user-button ${!buttonVisible && 'd-none'}`} onClick={handleDeleteClick}>Eliminar Selección</button>
      {showModal && (
        <div className="modal-delete-user-overlay" onClick={handleCloseModal}>
          <div className="modal-delete-user" onClick={(e) => e.stopPropagation()}>
            <label className='modal-titulo'>Confirmar eliminación</label>
            <p className='modal-mensaje-confirmar'>¿Estás seguro de que deseas eliminar su selección?</p>
            <div className="modal-buttons">
              <button onClick={handleCloseModal}>Cancelar</button>
              <button className='confirmDeleteButton' onClick={handleConfirmDelete}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-delete-overlay" onClick={handleCloseModal}></div>}
    </>
  );
}

export default DeleteButton;
