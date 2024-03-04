import React, { useState } from "react";
import '../css/searchBar.css';
import { SideBar } from "./SideBar";
import SearchBar from './SearchBar'

export const HeadComponent = ({criteria, setSearch, searchDefault}) => {
 

  return (
    <header>
      <SideBar />
      <div className="head-container">
        <h1 className="FarmaGestor">FarmaGestor</h1>
        <SearchBar criteria={criteria} setSearch={setSearch} searchDefault={searchDefault}/>
      </div>

    </header>
  );
};
