import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent.js';
import GenericTable from '../components/GenericTable.js';
import DeleteButton from '../components/DeleteButton.js';
import AddButton from '../components/AddButton.js';
import UpdateButton from '../components/UpdateButton.js';
import data from '../data/data.json'
import Pagination from '../components/Pagination.js'
import { Footer } from '../components/Footer';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);

  const searchDefault = 'Nombre';

  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Enfermedad' },
    { criteria: 'Grupo de Medicamentos' }
  ];

  const [search, setSearch] = useState({
    field: 'Nombre',
    value: ''
  });

  const { value, field } = search;

  const [tableData, setTableData] = useState(data.dbPatients);

  useEffect(() => {
    let res = data.dbPatients
    if (field === 'Nombre') res = data.dbPatients.filter(({ Nombre }) => Nombre.includes(value));
    else if (field === 'Enfermedades') res = data.dbPatients.filter(({ Enfermedades }) => Enfermedades.includes(value));
    else if (field === 'Grupo de Medicamentos') res = data.dbPatients.filter(({ Medicamentos }) => Medicamentos.includes(value));
    console.log(value, field)
    setTableData(res);
  }, [search]);

  const [itemList, setItemList] = useState([]);

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
        <>
          <UpdateButton
            itemType="Usuario"
            item={rowData}
            formFields={formFields}
          />
          <button onClick={() => console.log(`Modificar ${rowData.Nombre}`)}>Modificar</button>
        </>
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

  const handleConfirmDelete = () => {
    console.log('Pacientes seleccionados para eliminar:', selectedRows);
    setSelectedRows([]);
  };

  return (
    <div className='full-page'>
      <HeadComponent
        setSearch={setSearch}
        criteria={criteria}
        searchDefault={searchDefault}
      />
      <div className="container">
        <h3 className='titulo-tabla'>Pacientes con Tarjetón</h3>
        <GenericTable
          data={tableData
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((tableData, index) => ({
              ...tableData,
              Acciones:
                <div>
                  <UpdateButton
                    itemType=""
                    item={tableData}
                    formFields={formFields}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
            }))}
          columns={columns}
        />
        <Pagination
          totalItems={tableData.length}
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
          item={tableData}  
          setItem={setTableData}
          selectedItem={selectedRows}
          show={show}
          onConfirmDelete={handleConfirmDelete} 
          />
      </div>
      <Footer className='userFooter' />
    </div>
  );
}

export default PatientManagement;
