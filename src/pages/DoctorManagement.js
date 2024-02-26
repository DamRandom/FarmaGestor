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



  const [listaItems, setListaItems] = useState([]);
  const [doctorLista, setDoctorLista] = useState([]);

  const camposForm = [ //Campos del Formulario Annadir
    { nombre: 'nombreDoctor', tipo: 'text', placeholder: 'Nombre' },
    { nombre: 'Apellidos', tipo: 'text', placeholder: 'Apellidos' },
    { nombre: 'folioDoctor', tipo: 'text', placeholder: 'Folio' },
  ];

  const [doctores, setDoctores] = useState([]);

    useEffect(() => {
    setDoctores(data.dbDoctores);
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
  const [mostrar, setMostrar] = useState(false);

  // Manejar el cambio de checkbox
  const handleCheckboxChange = (index) => {
    setSelectedRows(selectedRows.includes(index) ? selectedRows.filter(row => row !== index) : [...selectedRows, index]);
    setMostrar(selectedRows.length === 0);
  };

  const handleConfirmDelete = () => {
    console.log('Doctores seleccionados para eliminar:', selectedRows);
  };

  return (
    <div className='full-page'>
      <HeadComponent titulo='Gestionar Doctores'
        criterio1='Nombre'
        criterio2='Folio'
      />
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Doctores</h3>
        <GenericTable
          data={doctores
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((doctores, index) => ({
              ...doctores,
              Acciones:
              <div>
                <UpdateButton
                  itemType=""
                  item={doctores}
                  camposForm={camposForm}
                />
              </div>,
            Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} className='checkBoxTabla' />
          }))}
          columns={columns}
          className="doctor-table"
        />

        <Pagination
          totalItems={doctores.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />

      </div>
      <div className="buttons">
        <AddButton
          itemType="Doctor"
          listaItems={listaItems}
          setListaItems={setListaItems}
          camposForm={camposForm} />


        <DeleteButton
          objeto={doctores}
          setObjeto={setDoctores}
          selectedObjeto={selectedRows}
          mostrar={mostrar}
          onConfirmDelete={handleConfirmDelete} /> {/* Pasar los doctores seleccionados y la función de confirmar eliminación */}
      </div>
      {/* <Footer /> */}
    </div >
  );
}

export default DoctorManagement;
