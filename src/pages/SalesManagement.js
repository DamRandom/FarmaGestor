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

  const formFields = [
    { name: 'Id Ventas', type: 'text', placeholder: 'ID Ventas' },
    { name: 'Medicamentos', type: 'text', placeholder: 'Medicamentos' },
    { name: 'Cantidad Vendida', type: 'text', placeholder: 'Cantidad Vendida' },
    { name: 'Fecha de Vencimiento', type: 'password', placeholder: 'Fecha de Vencimiento' },
    { name: 'Lote', type: 'text', placeholder: 'Lote' },
    { name: 'Importe', type: 'text', placeholder: 'Importe' },
  ];

  const searchDefault = 'Medicamento';

  const criteria = [
    { criteria: 'Medicamentos' },
    { criteria: 'Fecha' },
  ];

  const [search, setSearch] = useState({
    field: 'Medicamentos',
    value: ''
  });

  const { value, field } = search;

  const [tableData, setTableData] = useState(data.dbSales);

  useEffect(() => {
    let res = data.dbSales
    if (field === 'Medicamento') res = data.dbSales.filter(({ Medicamentos }) => Medicamentos.includes(value));
    else if (field === 'Fecha') res = data.dbSales.filter(({ Fecha }) => Fecha.includes(value));
    console.log(value, field)
    setTableData(res);
  }, [search]);

  const columns = [
    { header: 'ID Ventas', field: 'ID Ventas' },
    { header: 'Medicamentos', field: 'Medicamentos' },
    { header: 'Cantidad Vendida', field: 'Cantidad_Vendida' },
    { header: 'Fecha de Vencimiento', field: 'Fecha_de_Vencimiento' },
    { header: 'Lote', field: 'Lote' },
    { header: 'Importe', field: 'Importe' },
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

export default SalesManagement;
