import React, { useState } from "react";
import '../css/searchBar.css';
import { SideBar } from "./SideBar";

export const HeadComponent = ({ titulo, criterio1, criterio2 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByDate, setSearchByDate] = useState(false);
  const [searchByMedicine, setSearchByMedicine] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'date' && checked) {
      setSearchByDate(true);
      setSearchByMedicine(false);
    } else if (name === 'medicine' && checked) {
      setSearchByMedicine(true);
      setSearchByDate(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Realizar búsqueda con los siguientes criterios:");
    console.log("Término de búsqueda:", searchTerm);
    console.log("Buscar por fecha:", searchByDate);
    console.log("Buscar por medicina:", searchByMedicine);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <header>
      <SideBar />
      <h1>FarmaGestor</h1>
      <form onSubmit={handleSubmit} className="search-bar-container">
        <div onClick={toggleExpanded} className="search-input-container"> {/* Al hacer clic, expande el formulario */}
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        {expanded && (
          <div className="criteria-container">
            <label className='1check'>
              <input
                type="checkbox"
                name="date"
                checked={searchByDate}
                onChange={handleCheckboxChange}
              />
              {criterio1}
            </label>
            <label className='2check'>
              <input
                type="checkbox"
                name="medicine"
                checked={searchByMedicine}
                onChange={handleCheckboxChange}
              />
              {criterio2}
            </label>
          </div>
        )}
      </form>
    </header>
  );
};
