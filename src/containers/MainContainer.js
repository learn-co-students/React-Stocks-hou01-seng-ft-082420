import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
let stockUrl = 'http://localhost:3000/stocks'
class MainContainer extends Component {
  state = {
    stocks: [],
    myStocks: [],
    filter: 'All',
    sort: 'None',
    searchTerm: ""
  }

  componentDidMount = () => {
    fetch(stockUrl)
    .then(res=>res.json())
    .then(stocks=> this.setState({stocks}))
  }

  addStock = (addedStock) => {
    if (!this.state.myStocks.find(stock => stock === addedStock)){
      this.setState({
        myStocks: [...this.state.myStocks, addedStock]
      })
    }
  }

  removeStock = (removedStock) => {
    this.setState({
      myStocks: this.state.myStocks.filter(stock=> stock != removedStock)
    })
  }

  changeSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

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

  updateFilter = (filter) => {
    this.setState({filter})
  }

  updateSort = (sort) => {
    this.setState({sort})
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
