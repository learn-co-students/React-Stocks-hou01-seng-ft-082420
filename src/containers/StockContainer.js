import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {//The only tricky thing about this is that I made sure the prop was the same name on PortfolioContainer and StockContainer, but changed the prop passed in to make sure it was add or remove stock accordingly
          this.props.stocks.map(stock=> <Stock key={stock.id} stock={stock} manageStock={this.props.addStock}/>)
        }
      </div>
    );
  }

}

export default StockContainer;
