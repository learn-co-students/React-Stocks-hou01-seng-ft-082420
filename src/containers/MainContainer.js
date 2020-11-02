import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor() {
    super()
    this.state = {
      stocks: [],
      portfolio: [],
      ogstocks: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(data => {
        this.setState({
          stocks: data,
          ogstocks: data
        })
      })
  }

  addToPortfolio = (stock) => {
    if (!this.state.portfolio.includes(stock)) {
      this.setState({
        portfolio: [...this.state.portfolio, stock]
      })
    }
  }

  removePortfolio = (stock) => {
    let finalArray = this.state.portfolio.filter(s => s != stock)
    this.setState({
      portfolio: finalArray
    })
  }

  sortAlpha = () => {
    let sortArray = this.state.stocks.sort((a, b) => a.name < b.name ? -1 : 1)
    this.setState({
      stocks: sortArray
    })
  }

  sortPrice = () => {
    let sortArray = this.state.stocks.sort((a, b) => a.price < b.price ? -1 : 1)
    this.setState({
      stocks: sortArray
    })
  }

  filterStocks = (type) => {
    let filterArray = this.state.ogstocks.filter(stock => stock.type == type)
    this.setState({
      stocks: filterArray
    })
  }


  render() {
    return (
      <div>
        <SearchBar
          sortAlpha={this.sortAlpha}
          sortPrice={this.sortPrice}
          filterStocks={this.filterStocks}
        />

        <div className="row">
          <div className="col-8">

            <StockContainer stocks={this.state.stocks} addToPortfolio={this.addToPortfolio} />

          </div>
          <div className="col-4">

            <PortfolioContainer portfolio={this.state.portfolio}
              removePortfolio={this.removePortfolio} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
