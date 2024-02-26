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

  const [listaItems, setListaItems] = useState([]);

  //Datos para el modal de Añadir Usuarios
  const camposForm = [
    { nombre: 'Nombre', tipo: 'text', placeholder: 'Nombre' },
    { nombre: 'Apellidos', tipo: 'text', placeholder: 'Apellido' },
    { nombre: 'Usuario', tipo: 'text', placeholder: 'Usuario' },
    { nombre: 'Contraseña', tipo: 'password', placeholder: 'Contraseña' },
    { nombre: 'Rol', tipo: 'text', placeholder: 'Rol' },
  ];

  //Datos para simular una BD
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setUsuarios(data.bsUsuarios);
  },
    []);

  //Definir las columnas de la Tabla Generica
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
            setListaItems={setUsuarios}
            camposForm={camposForm}
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

  const [selectedRows, setSelectedRows] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  // Manejar el cambio de checkbox
  const handleCheckboxChange = (index) => {
    setSelectedRows(selectedRows.includes(index) ? selectedRows.filter(row => row !== index) : [...selectedRows, index]);
    setMostrar(selectedRows.length === 0);
  };

  const handleConfirmDelete = () => {
    console.log('Usuarios seleccionados para eliminar:', selectedRows);
    setSelectedRows([]); // Deseleccionar todos los checkboxes al confirmar la eliminación
  };
  

  return (

    <div className='full-page'>
      <HeadComponent titulo='Gestionar Usuario'
        criterio1='Nombre'
        criterio2='Apellido'
      />
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Usuarios</h3>
        <GenericTable
          data={usuarios
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((usuario, index) => ({
              ...usuario,
              Acciones:
                <div>
                  <UpdateButton
                    itemType=""
                    item={usuario}
                    camposForm={camposForm}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} />

            }))}
          columns={columns}
        />

        <Pagination
          totalItems={usuarios.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="buttons">
        <AddButton
          itemType="Usuario"
          listaItems={listaItems}
          setListaItems={setListaItems}
          camposForm={camposForm}
        />

        <DeleteButton
          objeto={usuarios}
          setObjeto={setUsuarios}
          selectedObjeto={selectedRows}
          mostrar={mostrar}
          onConfirmDelete={handleConfirmDelete}
        />
      </div>
      {/* <Footer /> */}
    </div >
  );
}

export default UserManagement;
