import React from 'react'

class Stock extends React.Component{
  constructor(){
    super()
    this.state={
      owned: false
    }
  }

  handleClick = (e) => {
    this.setState({
      owned: !this.state.owned
    })
    
    this.props.owned ? this.props.sellStock(this.props.stock) : this.props.buyStock(this.props.stock)  
  }

 

  render(){
    return(

      <div>

    <div onClick = {this.handleClick} className="card">
      <div className="card-body">
        <h5 className="card-title">{this.props.stock.name}</h5>
        <p className="card-text">{this.props.stock.ticker} : ${this.props.stock.price} per share</p>
      </div>
    </div>


  </div>
)
}


        }

export default Stock
