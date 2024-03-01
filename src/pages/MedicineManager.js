import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent'; 
import GenericTable from '../components/GenericTable';
import '../css/medicineManager.css';
import AddButton from '../components/AddButton';
import UpdateButton from '../components/UpdateButton';
import Pagination from '../components/Pagination';
import data from '../data/data.json';

const MedicineManager = () => {
  const [medicine, setMedicine] = useState([]);

  useEffect(() => {
    setMedicine(data.dbMedicine);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastElement = currentPage * itemsPerPage;
  const indexOfFirstElement = indexOfLastElement - itemsPerPage;

  const [itemList, setItemList] = useState([]); // Aquí creamos las variables itemList y setItemList

  const criteria = [
    { criteria: 'Nombre' },
    { criteria: 'Grupo' },
    { criteria: 'Estado' }
  ];

  const formFields = [
    { name: 'Nombre', type: 'text', placeholder: 'Nombre' },
    { name: 'Grupo', type: 'text', placeholder: 'Grupo' },
    { name: 'Existencia', type: 'text', placeholder: 'Existencia' },
    { name: 'Precio', type: 'text', placeholder: 'Precio' },
    { name: 'Estado', type: 'text', placeholder: 'Estado' },
  ];

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
        <button onClick={() => console.log(`Modificar ${rowData.Nombre}`)}>Modificar</button>
      )
    }
  ];

  return (
    <div className="full-page">
      {/* <HeadComponent
        criteria={criteria}
      /> */}

      {/* Contenido de la página de administración de medicine */}
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Medicamentos</h3>
        <GenericTable
          data={medicine
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((medicine, index) => ({
              ...medicine,
              Acciones:
              <div>
                <UpdateButton
                  itemType=""
                  item={medicine}
                  formFields={formFields}
                />
              </div>
          }))}
          columns={columns}
        />

        <Pagination
          totalItems={medicine.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="buttons">

        <AddButton
          itemType="Medicamento"
          itemList={itemList}
          setItemList={setItemList}
          formFields={formFields} />
      </div>
    </div>
  );
};

export default MedicineManager;
