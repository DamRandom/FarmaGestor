
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json';
import { getDoctores } from '../api/doctor';
import { Footer } from '../components/Footer';

const DoctorManagement = () => {
  const [itemList, setItemList] = useState([]);
  // const [doctorList, setDoctorList] = useState([]);

  const formFields = [
    { name: 'nombreDoctor', type: 'text', placeholder: 'Nombre' },
    { name: 'Apellidos', type: 'text', placeholder: 'Apellidos' },
    { name: 'folioDoctor', type: 'text', placeholder: 'Folio' },
  ];

  const searchDefault = 'Doctor';

  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Folio' },
  ];

  const [search, setSearch] = useState({
    field: 'Nombre_Doctor',
    value: ''
  });

  const { value, field } = search;

  const [tableData, setTableData] = useState(data.dbDoctors);

  useEffect(() => {
    let res = data.dbDoctors
    if (field === 'Nombre') res = data.dbDoctors.filter(({ Nombre_Doctor }) => Nombre_Doctor.includes(value));
    else if (field === 'Folio') res = data.dbDoctors.filter(({ Folio_Doctor }) => Folio_Doctor.includes(value));
    console.log(value, field)
    setTableData(res);
  }, [search]);

  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   // setDoctors(data.dbDoctors);
  //   async function loadDoctors(){
  //     const resp = await getDoctores();
  //     setDoctorList(resp.data)
  //   }
  //   loadDoctors();
  // },
  //   []);

  const columns = [
    { header: 'Nombre', field: 'Nombre_Doctor' },
    { header: 'Apellidos', field: 'Apellidos' },
    { header: 'Folio', field: 'Folio_Doctor' },
    {
      header: 'Acciones',
      field: 'Acciones',
      render: (rowData) => (
        <>
          <UpdateButton
            itemType="Doctor"
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
    console.log('Doctores seleccionados para eliminar:', selectedRows);
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
        <h3 className='titulo-tabla'>Listado de Doctores</h3>
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
          itemType="Doctor"
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
    </div >
  );
}

export default DoctorManagement;
