import React, { useState } from "react";
import '../css/searchBar.css';
import { SideBar } from "./SideBar";
import SearchBar from './SearchBar'

export const HeadComponent = ({ title, criteria}) => {
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
      <div className="head-container">
        <h1 className="FarmaGestor">FarmaGestor</h1>
        <SearchBar criteria={criteria}/>
      </div>

    </header>
  );
};
