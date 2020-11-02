import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    let newArray = this.props.stocks 
    return (
      <div>
        <h2>Stocks</h2>
        {newArray.map(stock => <Stock stock={stock} stockAction={this.props.addToPortfolio} />)}
      </div>
    );
  }

}

export default StockContainer;
