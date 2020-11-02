import React from 'react'

const Stock = (props) => (
  <div>
    <div className="card">
      <div className="card-body" 
      onClick={()=> props.buyStock? props.buyStock(props.stock) : props.sellStock(props.stock)}>
        <h5 className="card-title">{
          props.stock.name
          }</h5>
        <p className="card-text">{
          props.stock.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
