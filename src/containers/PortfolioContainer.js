import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    let newArray = this.props.portfolio
    return (
      <div>
        <h2>My Portfolio</h2>
            {newArray.map(stock => <Stock stock={stock} stockAction={this.props.removePortfolio} />)}
      </div>
    );
  }

}

export default PortfolioContainer;
