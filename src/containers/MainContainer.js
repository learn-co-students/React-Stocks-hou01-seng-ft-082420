import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  

  render() {
    return (
      <div>
        <SearchBar clearSearch={this.props.clearSearch} searchFor={this.props.searchFor} />

          <div className="row">
            <div className="col-8">

              <StockContainer buyStock ={this.props.buyStock} allStocks={this.props.allStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myStocks = {this.props.myStocks} sellStock={this.props.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
