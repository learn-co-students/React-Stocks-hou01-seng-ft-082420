import React, { Component } from 'react';
import StockContainer from './StockContainer';
import PortfolioContainer from './PortfolioContainer';
import SearchBar from '../components/SearchBar';
const stocksURL = 'http://localhost:3000/stocks/';

class MainContainer extends Component {
	state = {
		stocks: [],
		myStocks: [],
		checked: '',
    filter: '',
    searchTerm: ''
	};

	componentDidMount() {
		fetch(stocksURL)
			.then(res => res.json())
			.then(stocks => {
				this.setState({ stocks });
			});
	}

	handleStockClick = stock => {
		this.state.myStocks.includes(stock)
			? null
			: this.setState({
					myStocks: [...this.state.myStocks, stock],
			  });
	};

	handleMyStockClick = stock => {
		let myStocks = this.state.myStocks.filter(s => s.id !== stock.id);
		this.setState({ myStocks });
	};

	handleCheck = e => {
		let category = e.target.value;
		switch (category) {
			case 'Alphabetically':
				return this.setState({ checked: 'Alphabetically' });
			case 'Price':
				return this.setState({ checked: 'Price' });
		}
	};

	sortStocks = () => {
		if (this.state.checked === 'Alphabetically') {
			return this.state.stocks.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
		} else if (this.state.checked === 'Price') {
			return this.state.stocks.sort((a, b) => {
				return a.price - b.price;
			});
		} else {
			return this.state.stocks;
		}
	};

	handleFilter = filter => {
		this.setState({ filter });
  };
  
  handleChange = term => {
    let searchTerm = term.toLowerCase()
    this.setState({ searchTerm })
  }

	render() {
    let stocks = this.sortStocks().filter(stock => stock.type.includes(this.state.filter))
    let searchedStocks = stocks.filter(stock => stock.name.toLowerCase().includes(this.state.searchTerm))
		return (
			<div>
				<SearchBar
					checked={this.state.checked}
					handleCheck={this.handleCheck}
          handleFilter={this.handleFilter}
          handleChange={this.handleChange}
          // handleSubmit={this.handleSubmit}
				/>

				<div className='row'>
					<div className='col-8'>
						<StockContainer
							stocks={searchedStocks}
							handleClick={this.handleStockClick}
						/>
					</div>
					<div className='col-4'>
						<PortfolioContainer
							stocks={this.state.myStocks}
							handleClick={this.handleMyStockClick}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default MainContainer;
