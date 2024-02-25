import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../HeadComponent'; 
import GenericTable from '../GenericTable';
import '../../css/medicineManager.css';
import AddButton from '../AddButton';
import UpdateButton from '../UpdateButton';
import Pagination from '../Pagination';
import data from '../../data/data.json';

const MedicineManager = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    setMedicamentos(data.bsMedicamentos); // Establece los datos cargados desde el archivo JSON
  }, []);

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

  const [listaItems, setListaItems] = useState([]); // Aquí creamos las variables listaItems y setListaItems

  const camposForm = [
    { nombre: 'Nombre', tipo: 'text', placeholder: 'Nombre' },
    { nombre: 'Grupo', tipo: 'text', placeholder: 'Grupo' },
    { nombre: 'Existencia', tipo: 'text', placeholder: 'Existencia' },
    { nombre: 'Precio', tipo: 'text', placeholder: 'Precio' },
    { nombre: 'Estado', tipo: 'text', placeholder: 'Estado' },
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
      <HeadComponent
        criterio1="Nombre"
        criterio2="Grupo"
      />

      {/* Contenido de la página de administración de medicamentos */}
      <div className="container">
        <h3 className='titulo-tabla'>Listado de Medicamentos</h3>
        <GenericTable
          data={medicamentos
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((medicamento, index) => ({
              ...medicamento,
              Acciones:
              <div>
                <UpdateButton
                  itemType=""
                  item={medicamento}
                  camposForm={camposForm}
                />
              </div>
          }))}
          columns={columns}
        />

        <Pagination
          totalItems={medicamentos.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="buttons">
        <AddButton
          itemType="Medicamento"
          listaItems={listaItems}
          setListaItems={setListaItems}
          camposForm={camposForm} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MedicineManager;
