// UserManagement.js
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../HeadComponent';
import { Footer } from '../Footer';
import GenericTable from '../GenericTable';
import DeleteButton from '../DeleteButton';
import AddButton from '../AddButton';
import UpdateButton from '../UpdateButton';
import Pagination from '../Pagination';
import data from '../../data/data.json'



const SalesManagement = () => {

  const [listaItems, setListaItems] = useState([]); // Aquí creamos las variables listaItems y setListaItems

  useEffect(() => {
    setUsuarios(data.dbSales);
  },
    []);

  const camposForm = [
    { nombre: 'Id Ventas', tipo: 'text', placeholder: 'ID Ventas' },
    { nombre: 'Medicamentos', tipo: 'text', placeholder: 'Medicamentos' },
    { nombre: 'Cantidad Vendida', tipo: 'text', placeholder: 'Cantidad Vendida' },
    { nombre: 'Fecha de Vencimiento', tipo: 'password', placeholder: 'Fecha de Vencimiento' },
    { nombre: 'Lote', tipo: 'text', placeholder: 'Lote' },
    { nombre: 'Importe', tipo: 'text', placeholder: 'Importe' },
  ];

  const [ventas, setUsuarios] = useState([
    //Aqui van los datos generados para simular la base de datos en mi tabla
  ]);

  const columns = [
    { header: 'ID Ventas', field: 'ID Ventas' },
    { header: 'Medicamentos', field: 'Medicamentos' },
    { header: 'Cantidad Vendida', field: 'Cantidad Vendida' },
    { header: 'Fecha de Vencimiento', field: 'Fecha de Vencimiento' },
    { header: 'Lote', field: 'Lote' },
    { header: 'Importe', field: 'Importe' },
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
  };

  return (
    <div className='full-page'>
      <HeadComponent titulo='Gestionar Ventas'
        criterio1='Medicamento'
        criterio2='Fecha'
      />
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Ventas</h3>
        <GenericTable
          data={ventas
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
          totalItems={ventas.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="buttons">
        <AddButton itemType="Ventas" listaItems={listaItems} setListaItems={setListaItems} camposForm={camposForm} />


        <DeleteButton objeto={ventas} setObjeto={setUsuarios} selectedObjeto={selectedRows} mostrar={mostrar} onConfirmDelete={handleConfirmDelete} /> {/* Pasar los ventas seleccionados y la función de confirmar eliminación */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default SalesManagement;
