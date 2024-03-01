import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent.js';
import GenericTable from '../components/GenericTable.js';
import DeleteButton from '../components/DeleteButton.js';
import AddButton from '../components/AddButton.js';
import UpdateButton from '../components/UpdateButton.js';
import data from '../data/data.json'
import Pagination from '../components/Pagination.js'

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(data.dbPatients);
  }, []);  


  const [itemList, setItemList] = useState([]);

  const handleConfirmDelete = () => {
    console.log('Pacientes seleccionados para eliminar:', selectedRows);
  };

  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Enfermedad' },
    { criteria: 'Grupo de Medicamentos'}
  ];

  const formFields = [
    { name: 'Nombre', type: 'text', placeholder: 'Nombre' },
    { name: 'Apellidos', type: 'text', placeholder: 'Apellidos' },
    { name: 'Edad', type: 'text', placeholder: 'Edad' },
    { name: 'CI', type: 'text', placeholder: 'CI' },
    { name: 'Enfermedades', type: 'text', placeholder: 'Enfermedades' },
    { name: 'Medicamentos', type: 'text', placeholder: 'Medicamentos' },
  ];

  const columns = [
    { header: 'Nombre', field: 'Nombre' },
    { header: 'Apellidos', field: 'Apellidos' },
    { header: 'Edad', field: 'Edad' },
    { header: 'CI', field: 'CI' },
    { header: 'Enfermedades', field: 'Enfermedades' },
    { header: 'Medicamentos', field: 'Medicamentos' },
    {
      header: 'Acciones',
      field: 'Acciones',
      render: (rowData) => (
        <button onClick={() => console.log(`Modificar ${rowData.Nombre}`)}>Modificar</button>
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

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const indexOfLastElement = currentPage * itemsPerPage;
const indexOfFirstElement = indexOfLastElement - itemsPerPage;

const [selectedRows, setSelectedRows] = useState([]);
const [show, setShow] = useState(false);

  const handleCheckboxChange = (index) => {
    setSelectedRows(selectedRows.includes(index) ? selectedRows.filter(row => row !== index) : [...selectedRows, index]);
    setShow(selectedRows.length === 0);
  };

  return (
    <div className='full-page'>
      {/* <HeadComponent title='Pacientes con Tarjetón'
        criteria={criteria}
      /> */}
      <div className="container">
        <h3 className='titulo-tabla'>Pacientes con Tarjetón</h3>
        <GenericTable
          data={patients
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((patients, index) => ({
              ...patients,
              Acciones:
                <div>
                  <UpdateButton
                    itemType=""
                    item={patients}
                    formFields={formFields}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
            }))}
          columns={columns}
        />
        <Pagination
          totalItems={patients.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="buttons">
        <AddButton 
        itemType="Patients" 
        itemList={itemList} 
        setItemList={setItemList} 
        formFields={formFields} 
        />

        <DeleteButton 
        item={patients} 
        setItem={setPatients} 
        selectedItem={selectedRows} 
        show={show} 
        onConfirmDelete={handleConfirmDelete} />
      </div>
    </div>
  );
}

export default PatientManagement;
