import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
let stockUrl = 'http://localhost:3000/stocks'
class MainContainer extends Component {
  //empty array to hold each stock collection, and states to track each search term
  state = {
    stocks: [],
    myStocks: [],
    filter: 'All',
    sort: 'None',
    searchTerm: ""
  }

  //Fetch to collect all the data into the state when component mounts
  componentDidMount = () => {
    fetch(stockUrl)
    .then(res=>res.json())
    .then(stocks=> this.setState({stocks}))
  }

  //function to add a stock by checking to see if the stock exists in my portfolio, and if not, adding it
  addStock = (addedStock) => {
    if (!this.state.myStocks.find(stock => stock === addedStock)){
      this.setState({
        myStocks: [...this.state.myStocks, addedStock]
      })
    }
  }

  //remove all stocks that match the stock I am giving it
  removeStock = (removedStock) => {
    this.setState({
      myStocks: this.state.myStocks.filter(stock=> stock != removedStock)
    })
  }

  //series of functions to set the state based on the search bar
  changeSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  updateFilter = (filter) => {
    this.setState({filter})
  }

  updateSort = (sort) => {
    this.setState({sort})
  }

  //run all the search, filter, and sort functions and return the fully sorted/filtered/searched stocks array
  displayStocks = () => {
    let displayStocks = this.state.stocks.filter(stock=>stock.name.toLowerCase().includes(this.state.searchTerm))
    if(this.state.filter !== "All"){
      displayStocks = displayStocks.filter(stock=>stock.type == this.state.filter)
    }

    switch(this.state.sort){
      case "Alphabetically":
        return displayStocks.sort((a,b)=> a.name > b.name ? 1 : -1)
      case "Price":
        return displayStocks.sort((a,b)=> a.price > b.price ? 1 : -1)
      default:
          return displayStocks
    }

  }

  render() {
    return (
      <div>
        <SearchBar
          sort={this.state.sort}
          updateSort={this.updateSort}
          updateFilter={this.updateFilter}
          changeSearchTerm={this.changeSearchTerm}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                addStock= {this.addStock}
                stocks = {this.displayStocks()}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
              removeStock = {this.removeStock}
                stocks={this.state.myStocks}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
