import React from 'react'

const Stock = ({stock, manageStock}) => (
  <div>
  {/* Because I made the prop the same name I can call it once and pass it the stock */}
    <div className="card" onClick={()=> manageStock(stock)}>
      <div className="card-body">
        <h5 className="card-title">{
            stock.name
          }</h5>
        <p className="card-text">{
            stock.name + `:` + stock.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
