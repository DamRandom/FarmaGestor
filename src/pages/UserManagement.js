import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json';
import {Footer} from '../components/Footer'

const UserManagement = () => {

  const [itemList, setItemList] = useState([]);

  const formFields = [
    { name: 'Nombre', type: 'text', placeholder: 'Nombre' },
    { name: 'Apellidos', type: 'text', placeholder: 'Apellido' },
    { name: 'Usuario', type: 'text', placeholder: 'Usuario' },
    { name: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
    { name: 'Rol', type: 'text', placeholder: 'Rol' },
  ];

  //Search criteria
  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Usuario' },
    { criteria: 'Rol' }
  ];

  //Save search fields and values into var.
  const [search, setSearch] = useState({
    field: 'nombre',
    value: ''
  });

  const { value, field } = search;

  const [tableData, setTableData] = useState(data.dbUsers);

  useEffect(() => {
    let res = tableData
    if (field === 'Nombre') res = data.dbUsers.filter(({ Nombre }) => Nombre.includes(value));
    else if (field === 'Usuario') res = data.dbUsers.filter(({ Usuario }) => Usuario.includes(value));
    else if (field === 'Rol') res = data.dbUsers.filter(({ Rol }) => Rol.includes(value));
    setTableData(res);
  }, [search]);

  const columns = [
    { header: 'Nombre', field: 'Nombre' },
    { header: 'Apellidos', field: 'Apellidos' },
    { header: 'Usuario', field: 'Usuario' },
    { header: 'Contraseña', field: 'Contraseña' },
    { header: 'Rol', field: 'Rol' },
    {
      header: 'Acciones',
      field: 'Acciones',
      render: (rowData) => (
        <>
          <UpdateButton
            itemType="Usuario"
            item={rowData}
            setListaItems={setTableData}
            camposForm={formFields}
          />
          <button onClick={() => console.log(`Modificar ${rowData.Nombre}`)}>Modificar</button>
        </>
      )
    },
    {
      header: <input type= 'checkbox' className='selectAllCheck'></input>,
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
    console.log('Usuarios seleccionados para eliminar:', selectedRows);
    setSelectedRows([]);
  };

  return (

    <div className='full-page'>
      {/* <HeadComponent
        setSearch={setSearch}
        criteria={criteria}
      /> */}
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Usuarios</h3>
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
          itemType="Users"
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
      <Footer className='userFooter'/>
    </div >
  );
}

export default UserManagement;
