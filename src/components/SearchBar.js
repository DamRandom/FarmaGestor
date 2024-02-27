import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm, filter);
    };

    return (
        <div className="SearchBar">
            <input
                className='SearchInput'
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
            <select 
            className='selectCriteria' 
            value={filter} 
            onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );

};

export default SearchBar;
