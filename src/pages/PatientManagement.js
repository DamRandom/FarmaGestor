import React, { useEffect, useState } from 'react';
import { HeadComponent } from '../components/HeadComponent.js';
import { Footer } from '../components/Footer.js';
import GenericTable from '../components/GenericTable.js';
import DeleteButton from '../components/DeleteButton.js';
import AddButton from '../components/AddButton.js';
import UpdateButton from '../components/UpdateButton.js';
import data from '../data/data.json'
import Pagination from '../components/Pagination.js'

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(data.dbPatients);
  }, []);


  const [listaItems, setListaItems] = useState([]); // Aquí creamos las variables listaItems y setListaItems

  const handleConfirmDelete = () => {
    console.log('Pacientes seleccionados para eliminar:', selectedRows);
  };

  

  const camposForm = [
    { nombre: 'Nombre', tipo: 'text', placeholder: 'Nombre' },
    { nombre: 'Apellidos', tipo: 'text', placeholder: 'Apellidos' },
    { nombre: 'Edad', tipo: 'text', placeholder: 'Edad' },
    { nombre: 'CI', tipo: 'text', placeholder: 'CI' },
    { nombre: 'Enfermedades', tipo: 'text', placeholder: 'Enfermedades' },
    { nombre: 'Medicamentos', tipo: 'text', placeholder: 'Medicamentos' },
  ];

  const columns = [
    { header: 'Nombre', field: 'Nombre' },
    { header: 'Apellidos', field: 'Apellidos' },
    { header: 'Edad', field: 'Edad' },
    { header: 'CI', field: 'CI' },
    { header: 'Enfermedades', field: 'Enfermedades' },
    { header: 'Medicamentos', field: 'Medicamentos' },
    {
      header: 'Acciones',
      field: 'Acciones',
      render: (rowData) => (
        <button onClick={() => console.log(`Modificar ${rowData.Nombre}`)}>Modificar</button>
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

  return (
    <div className='full-page'>
      <HeadComponent titulo='Pacientes con Tarjetón'
        criterio1='Nombre'
        criterio2='Enfermedad'
      />
      <div className="container">
        <h3 className='titulo-tabla'>Pacientes con Tarjetón</h3>
        <GenericTable
          data={patients
            .slice(indexOfFirstElement, indexOfLastElement)
            .map((patiens, index) => ({
              ...patiens,
              Acciones:
                <div>
                  <UpdateButton
                    itemType=""
                    item={patients}
                    camposForm={camposForm}
                  />
                </div>,
              Checkbox: <input type="checkbox" onChange={() => handleCheckboxChange(index)} />
            }))}
          columns={columns}
        />
        <Pagination
          totalItems={patients.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="buttons">
        <AddButton itemType="Paciente" 
        listaItems={listaItems} 
        setListaItems={setListaItems} 
        camposForm={camposForm} />

        <DeleteButton 
        objeto={patients} 
        setObjeto={setPatients} 
        selectedObjeto={selectedRows} 
        mostrar={mostrar} 
        onConfirmDelete={handleConfirmDelete} />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default PatientManagement;
