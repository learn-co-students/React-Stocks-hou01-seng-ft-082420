import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.checked === 'a' ? true:false} onChange={props.sortBy}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.checked === 'p' ? true:false} onChange={props.sortBy}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.filterStocks}>
        <option value="">Select an Industry</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
      <br/>

      <strong>Search Name</strong>
      <label>
        <input type="textField" onChange={props.searchName}/>
      </label>

    </div>
  );
}


export default SearchBar;
