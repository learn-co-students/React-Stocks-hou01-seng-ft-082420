import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";
let stocksUrl = "http://localhost:3000/stocks";
class MainContainer extends Component {
  state = {
    allStocks: [],
    myStocks: [],
    sort: "None",
    filter: "All",
    searchTerm: "",
  };

  componentDidMount = () => {
    fetch(stocksUrl)
      .then((r) => r.json())
      .then((allStocks) => this.setState({ allStocks }));
  };

  addStocks = (newStock) => {
    if (!this.state.myStocks.find((stock) => stock === newStock)) {
      this.setState({ myStocks: [...this.state.myStocks, newStock] });
    }
  };

  removeStocks = (deletedStock) => {
    this.setState({
      myStocks: this.state.myStocks.filter((stock) => stock !== deletedStock),
    });
  };

  handleSearchChange = (val) => {
    this.setState({ searchTerm: val });
  };

  updateSort = (sort) => {
    this.setState({ sort });
  };

  updateFilter = (filter) => {
    this.setState({ filter });
  };

  displayStocks = () => {
    // let displayStocks = this.state
    let displayStocks = this.state.allStocks.filter((stock) =>
      stock.name.toLowerCase().includes(this.state.searchTerm)
    );

    if (this.state.filter !== "All") {
      displayStocks = displayStocks.filter(stock => stock.type === this.state.filter)
    }

    switch(this.state.sort){
      case "Alphabetically":
        return displayStocks.sort((a,b)=> a.name > b.name ? 1 : -1)
      case "Price":
        return displayStocks.sort((a,b)=> a.price > b.price ? 1 : -1)
      case "None":
        return displayStocks
    }
    return displayStocks;
  };

  render() {
    return (
      <div>
        <SearchBar
        sort={this.state.sort}
          updateSort={this.updateSort}
          updateFilter={this.updateFilter}
          handleSearchChange={this.handleSearchChange}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              addStocks={this.addStocks}
              stocks={this.displayStocks()}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              removeStocks={this.removeStocks}
              stocks={this.state.myStocks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
