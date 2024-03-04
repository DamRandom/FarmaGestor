// UserManagement.js
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import data from '../data/data.json'
import Pagination from '../components/Pagination'
import { Footer } from '../components/Footer';

const DateBookManagement = () => {
  const [itemList, setItemList] = useState([]);

  const formFields = [
    { name: 'Nombre', type: 'text', placeholder: 'Nombre' },
    { name: 'Lote', type: 'text', placeholder: 'Lote' },
    { name: 'Cantidad', type: 'text', placeholder: 'Cantidad' },
    { name: 'fecha_vencimiento', type: 'text', placeholder: 'Fecha Vencimiento' },
  ];

  const searchDefault = 'Nombre';

  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Fecha de Vencimiento' },
  ];

  const [search, setSearch] = useState({
    field: 'Nombre',
    value: ''
  });

  const { value, field } = search;

  const [tableData, setTableData] = useState(data.dbDateBook);

  useEffect(() => {
    let res = data.dbDateBook
    if (field === 'Nombre') res = data.dbDateBook.filter(({ Nombre }) => Nombre.includes(value));
    else if (field === 'Fecha de Vencimiento') res = data.dbDateBook.filter(({ Fecha_de_Vencimiento }) => Fecha_de_Vencimiento.includes(value));
    console.log(value, field)
    setTableData(res);
  }, [search]);

  const columns = [
    { header: 'Nombre', field: 'Nombre' },
    { header: 'Lote', field: 'Lote' },
    { header: 'Cantidad', field: 'Cantidad' },
    { header: 'Fecha Vencimiento', field: 'Fecha_de_Vencimiento' },
    {
      header: 'Acciones',
      field: 'Acciones',
      render: (rowData) => (
        <>
          <UpdateButton
            itemType=""
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
  const [show, setMostrar] = useState(false);

  const handleCheckboxChange = (index) => {
    setSelectedRows(selectedRows.includes(index) ? selectedRows.filter(row => row !== index) : [...selectedRows, index]);
    setMostrar(selectedRows.length === 0);
  };

  const handleConfirmDelete = () => {
    console.log('Medicamentos seleccionados para eliminar:', selectedRows);
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
        <h3 className='titulo-tabla'>Libro de Vencimiento</h3>
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
          itemType=""
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

export default DateBookManagement;
