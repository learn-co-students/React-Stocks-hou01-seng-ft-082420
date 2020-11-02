import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const url = 'http://localhost:3000/stocks/'


class MainContainer extends Component {

  state = {
    stocks: [],
    displayedStocks: [],
    portfolio: [],
    filter: ''
  }

  componentDidMount(){
    this.fetchStocks()
  }

  fetchStocks = () => {
    fetch(url)
    .then(res => res.json())
    .then(stocks => {
      this.setState({
        stocks: stocks,
        displayedStocks: stocks
      })
    })
  }

  buyStock = (boughtStock) => {
    if (this.state.portfolio.includes(boughtStock)){
      console.log("bought up!")
    }else{
      this.setState({
        portfolio: [...this.state.portfolio, boughtStock]
      })
    }
  }

  sellStock = (soldStock) => {
    this.setState({
      portfolio: this.state.portfolio.filter( stock => stock.id !== soldStock.id )
    })
  }

  filterStocks = (type) => {
    console.log(type)
    this.setState({
      displayedStocks: this.state.stocks.filter( stock => stock.type === type)
    })
  }

  sortByName = () => {
    console.log('displayedStocks', this.state.displayedStocks)
    // debugger 
    this.setState({
      displayedStocks: this.state.displayedStocks.sort( (a,b) => a.ticker.localeCompare(b.ticker) )
    })
  }

  sortByPrice = () => {
    console.log('displayedStocks', this.state.displayedStocks)
    // debugger 
    this.setState({
      displayedStocks: this.state.displayedStocks.sort( (a,b) => a.price>b.price ? 1 : -1 )
    })
  }

  searchForStock = (input) => {
    // debugger
    if (input.length == 0) {
      this.setState({
        displayedStocks: this.state.stocks
      })
    }else{
      this.setState({
        displayedStocks: this.state.stocks.filter( stock => stock.name.toLowerCase().includes(input.toLowerCase()))
      })
   }
  }

  render() {
    return (
      <div>
        <SearchBar 
        filterStocks={this.filterStocks}
        sortByName={this.sortByName}
        sortByPrice={this.sortByPrice}
        searchForStock={this.searchForStock}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
              stocks={this.state.displayedStocks} 
              buyStock={this.buyStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer 
              portfolio={this.state.portfolio} 
              sellStock={this.sellStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
