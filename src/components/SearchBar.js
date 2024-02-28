import { useState } from "react";

const SearchBar = ({ setSearch, criteria = [] }) => {

    const [searchValues, setSearchValues] = useState({
        field: 'Nombre',
        value: ''
    });

    const [reset, setReset] = useState(false);


    const handleInputChange = ({ target }) => {
        setSearchValues({
            ...searchValues,
            value: target.value
        });
    }

    const handleSelect = ({ target }) => {
        setSearchValues({
            ...searchValues,
            field: target.value
        });
    }

    const handleOnClic = () => {
        setSearch(searchValues);
    };

    const handleReset = () => {
        
        setSearch({
            field: 'Nombre',
            value: ''
        })
        setSearchValues({
            ...searchValues,
            value: ''
        });
    }

    return (
        <div className="SearchBar" >
            <select
                onChange={handleSelect}
                className='selectCriteria'
            >
                {
                    criteria.map(item => <option key={item.criteria} value={item.criteria} >{item.criteria}</option>
                    )
                }
            </select>
            <input
                value={searchValues.value}
                onChange={handleInputChange}
                className='SearchInput'
                type="text"
                placeholder="Buscar..."
            />
            <button className="restartSearch" onClick={handleReset}>✖</button>
            <button onClick={handleOnClic} >Buscar</button>
        </div >
    );

};

export default SearchBar;
