// UserManagement.js
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json'

const UserManagement = () => {

  const [itemList, setItemList] = useState([]);

  const formFields = [
    { name: 'Nombre', type: 'text', placeholder: 'Nombre' },
    { name: 'Apellidos', type: 'text', placeholder: 'Apellido' },
    { name: 'Usuario', type: 'text', placeholder: 'Usuario' },
    { name: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
    { name: 'Rol', type: 'text', placeholder: 'Rol' },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data.dbUsers);
  },
    []);

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
            setListaItems={setUsers}
            camposForm={formFields}
          />
          <button onClick={() => console.log(`Modificar ${rowData.Nombre}`)}>Modificar</button>
        </>
      )
    },
    {
      header: '',
      className: 'columnCheckBox',
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
      <HeadComponent title='Gestionar Usuario'
        criteria1='Nombre'
        criteria2='Apellido'
      />
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Usuarios</h3>
        <GenericTable
          data={users
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((user, index) => ({
              ...user,
              Acciones:
                <div>
                  <UpdateButton
                    itemType=""
                    item={user}
                    formFields={formFields}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} />

            }))}
          columns={columns}
        />

        <Pagination
          totalItems={users.length}
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
          item={users}
          setItem={setUsers}
          selectedItem={selectedRows}
          show={show}
          onConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div >
  );
}

export default UserManagement;
