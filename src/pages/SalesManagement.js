// UserManagement.js
import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent';
import GenericTable from '../components/GenericTable';
import DeleteButton from '../components/DeleteButton';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json'
import { Footer } from '../components/Footer';

const SalesManagement = () => {

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setTableData(data.dbSales);
  },
    []);

    const criteria = [
      { criteria: 'Medicamento' },
      { criteria: 'Fecha' },
    ];

    //Save search fields and values into var.
  const [search, setSearch] = useState({
    field: 'nombre',
    value: ''
  });

  const { value, field } = search;

  const [tableData, setTableData] = useState(data.dbSales);

  useEffect(() => {
    let res = tableData
    if (field === 'Medicamento') res = data.dbSales.filter(({ Medicamento }) => Medicamento.includes(value));
    else if (field === 'Fecha') res = data.dbSales.filter(({ Fecha }) => Fecha.includes(value));
    setTableData(res);
  }, [search]);

  const formFields = [
    { name: 'Id Ventas', type: 'text', placeholder: 'ID Ventas' },
    { name: 'Medicamentos', type: 'text', placeholder: 'Medicamentos' },
    { name: 'Cantidad Vendida', type: 'text', placeholder: 'Cantidad Vendida' },
    { name: 'Fecha de Vencimiento', type: 'password', placeholder: 'Fecha de Vencimiento' },
    { name: 'Lote', type: 'text', placeholder: 'Lote' },
    { name: 'Importe', type: 'text', placeholder: 'Importe' },
  ];


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

  // Current Page Status
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcula los índices de los elementos a mostrar en la página actual
  const indexOfLastElement = currentPage * itemsPerPage;
  const indexOfFirstElement = indexOfLastElement - itemsPerPage;

  const [selectedRows, setSelectedRows] = useState([]);
  const [show, setShow] = useState(false);

  // Manejar el cambio de checkbox
  const handleCheckboxChange = (index) => {
    setSelectedRows(selectedRows.include(index) ? selectedRows.filter(row => row !== index) : [...selectedRows, index]);
    setShow(selectedRows.length === 0);
  };

  const handleConfirmDelete = () => {
    console.log('Usuarios seleccionados para eliminar:', selectedRows);
  };

  return (
    <div className='full-page'>
      {/* <HeadComponent
      setSearch={setSearch}
        criteria={criteria}
      /> */}
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Ventas</h3>
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
          itemType="Ventas"
          itemList={itemList}
          setItemList={setItemList}
          formFields={formFields} />


        <DeleteButton
          item={tableData}
          setItem={setTableData}
          selectedItem={selectedRows}
          show={show}
          onConfirmDelete={handleConfirmDelete} />
      </div>
      <Footer className='userFooter'/>
    </div>
  );
}

export default SalesManagement;
