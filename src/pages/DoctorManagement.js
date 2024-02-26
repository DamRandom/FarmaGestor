// UserManagement.js
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json';



const DoctorManagement = () => {

  const [itemList, setItemList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  const formFields = [
    { name: 'nombreDoctor', type: 'text', placeholder: 'Nombre' },
    { name: 'Apellidos', type: 'text', placeholder: 'Apellidos' },
    { name: 'folioDoctor', type: 'text', placeholder: 'Folio' },
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(data.dbDoctors);
  },
    []);

  // Estado para el número de página actual
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcula los índices de los elementos a mostrar en la página actual
  const indexOfLastElement = currentPage * itemsPerPage;
  const indexOfFirstElement = indexOfLastElement - itemsPerPage;

  const columns = [
    { header: 'Nombre', field: 'nombreDoctor' },
    { header: 'Apellidos', field: 'Apellidos' },
    { header: 'Folio', field: 'folioDoctor' },
    {
      header: 'Acciones',
      field: 'Acciones',
      render: (rowData) => (
        <button>Modificar</button>
      )
    },
    {
      header: '',
      className: 'columnCheckBox',
      field: 'Checkbox',
      render: (rowData, rowIndex) => (
        <input type="checkbox" onChange={() => handleCheckboxChange(rowIndex)} />
      )
    }
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [show, setShow] = useState(false);

  const handleCheckboxChange = (index) => {
    setSelectedRows(selectedRows.includes(index) ? selectedRows.filter(row => row !== index) : [...selectedRows, index]);
    setShow(selectedRows.length === 0);
  };

  const handleConfirmDelete = () => {
    console.log('Doctores seleccionados para eliminar:', selectedRows);
  };

  return (
    <div className='full-page'>
      <HeadComponent
        title='Gestionar Doctores'
        criteria1='Nombre'
        criteria2='Folio'
      />
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Doctores</h3>
        <GenericTable
          data={doctors
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((doctors, index) => ({
              ...doctors,
              Acciones:
                <div>
                  <UpdateButton
                    itemType=""
                    item={doctors}
                    formFields={formFields}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} className='checkBoxTabla' />
            }))}
          columns={columns}
          className="doctor-table"
        />

        <Pagination
          totalItems={doctors.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />

      </div>
      <div className="buttons">
        <AddButton
          itemType="Doctor"
          itemList={itemList}
          setItemList={setItemList}
          formFields={formFields} />


        <DeleteButton
          item={doctors}
          setItem={setDoctors}
          selectedItem={selectedRows}
          show={show}
          onConfirmDelete={handleConfirmDelete} /> {/* Pasar los doctores seleccionados y la función de confirmar eliminación */}
      </div>
    </div >
  );
}

export default DoctorManagement;
