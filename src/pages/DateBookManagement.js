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

  const [itemList, setItemList] = useState([]);

  const formFields = [
    { name: 'Nombre', type: 'text', placeholder: 'Nombre' },
    { name: 'Lote', type: 'text', placeholder: 'Lote' },
    { name: 'Cantidad', type: 'text', placeholder: 'Cantidad' },
    { name: 'fecha_vencimiento', type: 'text', placeholder: 'Fecha Vencimiento' },
  ];

  useEffect(() => {
    setDateBook(data.dbDateBook);
  },
    []);

  const [dateBook, setDateBook] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastElement = currentPage * itemsPerPage;
  const indexOfFirstElement = indexOfLastElement - itemsPerPage;

  const criteria = [
    { criteria: 'Medicamento' },
    { criteria: 'Fecha de Vencimiento' },
  ];

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
  const [show, setMostrar] = useState(false);

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
        criteria={criteria}
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
                    formFields={formFields}
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
        <AddButton
          itemType="Lote"
          itemList={itemList}
          setItemList={setItemList}
          formFields={formFields} />


        <DeleteButton
          item={dateBook}
          setItem={setDateBook}
          selectedItem={selectedRows}
          show={show}
          onConfirmDelete={handleConfirmDelete} />
      </div>
    </div>
  );
}

export default DateBookManagement;
