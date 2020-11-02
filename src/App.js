import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'

class App extends Component {
  constructor(){
    super()
    this.state ={
      allStocks: [],
      myStocks: []
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks => 
      this.setState({
        allStocks: stocks,
        myStocks: []
      })

    )
  }


  buyStock = (stockToBuy) => {
    console.log(stockToBuy)
    this.setState({
     myStocks: [...this.state.myStocks, stockToBuy]
   })

  }

  sellStock = (stockToSell) => {
    this.setState({
      myStocks: this.state.myStocks.filter(stock => stock.id != stockToSell.id)
    })
  }

  searchFor = (stockSearch) => {
    console.log('search was for', stockSearch)
    this.setState({
      allStocks: this.state.allStocks.filter(stock => stock.name.toLowerCase().includes(stockSearch))
    })
  }

  clearSearch =() => {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stocks => 
      this.setState({
        allStocks: stocks
      }))
    
  }



  render() {
    return (
      <div>
        <Header/>
        <MainContainer clearSearch={this.clearSearch} searchFor={this.searchFor} allStocks={this.state.allStocks} myStocks={this.state.myStocks} buyStock={this.buyStock} sellStock={this.sellStock}/>
      </div>
    );
  }
}

export default App;
