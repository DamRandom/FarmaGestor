



const SearchBar = ({ onSearch, criteria=[] }) => {

  
    return (
        <div className="SearchBar">
            <select 
            className='selectCriteria' 
            >
                {
                    criteria.map( item => <option >{item.criteria}</option>
                    )
                }            
            </select>
            <input
                className='SearchInput'
                type="text"
                placeholder="Buscar..."
            />
            
            <button >Buscar</button>
        </div>
    );

};

export default SearchBar;
