import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'

class App extends Component {

  constructor(){
    super();
    this.state = ({
      stocks: [],
      myStocks: [],
      checked:'',
      filter:''
    })
  }


  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res=>res.json())
    .then(stocks => this.setState({stocks}))
  }

  buyStock = (selectedStock) => {
    this.setState({
      myStocks: [...this.state.myStocks, selectedStock]
    })
  }

  sellStock = (selectedStock) => {
    this.setState({
      myStocks: this.state.myStocks.filter(stock => stock.id !== selectedStock.id)
    })
  }

  searchName = (e) => {
    let userInput = e.target.value.toLowerCase()
    let stocks = this.state.stocks.sort(function(a,b){
      let nameA =  a.name.toLowerCase(); 

      let nameB = b.name.toLowerCase();

      if (!nameA.includes(userInput) && nameB.includes(userInput)){
        return 1;
      }
      else if (nameA.includes(userInput) && !nameB.includes(userInput)){
        return -1;
      }
      else{
        return 0;
      }
    })
    this.setState({
      stocks: stocks 
    })
  }

  sortBy = (e) => {
    let category = e.target.value
    switch(category){
      case 'Alphabetically':
        this.setState({
          checked: "a",
          stocks: this.state.stocks.sort((a,b) => (a.name > b.name) ? 1:-1)
        })
        break;
      case 'Price':
        this.setState({
          checked: "p",
          stocks: this.state.stocks.sort((a,b) => (a.price > b.price) ? 1:-1)
        })
        break;
      default:
        console.log(category) 
    }
  }

  filterStocks = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  render() {
    const stocks = this.state.stocks.filter(stock => stock.type.includes(this.state.filter))
    return (
      <div>
        <Header/>

        <MainContainer 
        stocks={stocks}
        myStocks={this.state.myStocks}
        buyStock={this.buyStock}
        sellStock={this.sellStock}
        searchName={this.searchName}
        sortBy={this.sortBy}
        checked={this.state.checked}
        filterStocks={this.filterStocks}
        />

      </div>
    );
  }
}

export default App;
