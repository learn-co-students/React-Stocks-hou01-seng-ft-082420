import React from 'react';

class SearchBar extends React.Component {
  constructor(){
    super()
    this.state={
      search: ''
    }
  }


  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.searchFor(this.state.search)
  }

  render() {
    return (
      <div>

        <strong>Sort by:</strong>
        <label>
          <input type="radio" value="Alphabetically" checked={null} onChange={null} />
        Alphabetically
      </label>
        <label>
          <input type="radio" value="Price" checked={null} onChange={null} />
        Price
      </label>
        <br />

        <label>
          <strong>Filter:</strong>
          <select onChange={null}>
            <option value="Tech">Tech</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Finance">Finance</option>
          </select>
        </label>

        <form>  
          <label>enter name to search</label>
          <input onChange={this.handleChange}></input>
        </form>
        <button onClick={this.handleSubmit}> search </button>
        <button onClick={this.props.clearSearch}> clear search </button>

      </div>
    );
  }
}

export default SearchBar;
