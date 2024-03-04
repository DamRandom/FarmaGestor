import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent'; 
import GenericTable from '../components/GenericTable';
import '../css/medicineManager.css';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json';
import { Footer } from '../components/Footer';

const MedicineManager = () => {
  const [itemList, setItemList] = useState([]);

  const formFields = [
    { name: 'Nombre', type: 'text', placeholder: 'Nombre' },
    { name: 'Grupo', type: 'text', placeholder: 'Grupo' },
    { name: 'Existencia', type: 'text', placeholder: 'Existencia' },
    { name: 'Precio', type: 'text', placeholder: 'Precio' },
    { name: 'Estado', type: 'text', placeholder: 'Estado' },
  ];

  const searchDefault = 'Nombre';

  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Grupo' },
    { criteria: 'Estado' }
  ];

  const [search, setSearch] = useState({
    field: 'Nombre',
    value: ''
  });

  const { value, field } = search;

  const [tableData, setTableData] = useState(data.dbMedicine);

  useEffect(() => { //TODO SearchBar
    let res = data.dbMedicine
    if (field === 'Nombre') res = data.dbMedicine.filter(({ Nombre }) => Nombre.includes(value));
    else if (field === 'Grupo') res = data.dbMedicine.filter(({ Grupo }) => Grupo.includes(value));
    else if (field === 'Estado') res = data.dbMedicine.filter(({ Estado }) => Estado.includes(value));
    console.log(value, field)
    setTableData(res);
  }, [search]);

  const columns = [
    { header: 'Nombre', field: 'Nombre' },
    { header: 'Grupo', field: 'Grupo' },
    { header: 'Existencia', field: 'Existencia' },
    { header: 'Precio', field: 'Precio' },
    { header: 'Estado', field: 'Estado' },
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
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastElement = currentPage * itemsPerPage;
  const indexOfFirstElement = indexOfLastElement - itemsPerPage;  

  return (
    <div className="full-page">
      <HeadComponent
        setSearch={setSearch}
        criteria={criteria}
        searchDefault={searchDefault}
      />
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Medicamentos</h3>
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
              </div>
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
          formFields={formFields} />
      </div>
    </div>
  );
};

export default MedicineManager;
