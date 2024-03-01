// UserManagement.js
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json';
import { getDoctores } from '../api/doctor';



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
    // setDoctors(data.dbDoctors);
    async function loadDoctors(){
      const resp = await getDoctores();
      setDoctorList(resp.data)
    }
    loadDoctors();
  },
    []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastElement = currentPage * itemsPerPage;
  const indexOfFirstElement = indexOfLastElement - itemsPerPage;

  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Folio' },
  ];

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
      {/* <HeadComponent
        title='Gestionar Doctores'
        criteria={criteria}
      /> */}
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Doctores</h3>
        <GenericTable
          data={doctorList
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((doctorList, index) => ({
              ...doctorList,
              Acciones:
                <div>
                  <UpdateButton
                    itemType="Doctor"
                    item={doctorList}
                    formFields={formFields}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} className='checkBoxTabla' />
            }))}
          columns={columns}
          className="doctor-table"
        />

        <Pagination
          totalItems={doctorList.length}
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
          item={doctorList}
          setItem={setDoctorList}
          selectedItem={selectedRows}
          show={show}
          onConfirmDelete={handleConfirmDelete} />
      </div>
    </div >
  );
}

export default DoctorManagement;
