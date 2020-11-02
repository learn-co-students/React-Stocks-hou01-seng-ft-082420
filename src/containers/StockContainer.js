import React, { Component } from 'react';
import Stock from '../components/Stock'


class StockContainer extends Component {


  displayStocks = () => {
    return this.props.allStocks.map(stockInfo => (
       <Stock
        stock={stockInfo}
        buyStock={this.props.buyStock}
        owned={false}
      />
    ))
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.displayStocks()}
      </div>
    );
  }

}

export default StockContainer;
