// UserManagement.js
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import data from '../data/data.json'
import Pagination from '../components/Pagination'

const DateBookManagement = () => {

  const [listaItems, setListaItems] = useState([]); // Aquí creamos las variables listaItems y setListaItems

  const camposForm = [
    { nombre: 'Nombre', tipo: 'text', placeholder: 'Nombre' },
    { nombre: 'Lote', tipo: 'text', placeholder: 'Lote' },
    { nombre: 'Cantidad', tipo: 'text', placeholder: 'Cantidad' },
    { nombre: 'fecha_vencimiento', tipo: 'text', placeholder: 'Fecha Vencimiento' },
  ];

  useEffect(() => {
    setDateBook(data.dbDateBook);
  },
    []);

  const [dateBook, setDateBook] = useState([]);

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
    { header: 'Nombre', field: 'Nombre' },
    { header: 'Lote', field: 'Lote' },
    { header: 'Cantidad', field: 'Cantidad' },
    { header: 'Fecha Vencimiento', field: 'fecha_vencimiento' },
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
    console.log('Medicamentos seleccionados para eliminar:', selectedRows);
  };

  return (
    <div className='full-page'>
      <HeadComponent titulo='Gestionar Libro de Vencimiento'
        criterio1='Medicamento'
        criterio2='Fecha de Vencimiento'
      />
      <div className="container">
        <h3 className='titulo-tabla'>Libro de Vencimiento</h3>
        <GenericTable
          data={dateBook
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((dateBook, index) => ({
              ...dateBook,
              Acciones:
                <div>
                  <UpdateButton
                    itemType=""
                    item={dateBook}
                    camposForm={camposForm}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
            }))}
          columns={columns}
        />
        <Pagination
          totalItems={dateBook.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="buttons">
        <AddButton itemType="Lote" listaItems={listaItems} setListaItems={setListaItems} camposForm={camposForm} />


        <DeleteButton
          objeto={dateBook}
          setObjeto={setDateBook}
          selectedObjeto={selectedRows}
          mostrar={mostrar}
          onConfirmDelete={handleConfirmDelete} /> {/* Pasar los usuarios seleccionados y la función de confirmar eliminación */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default DateBookManagement;
