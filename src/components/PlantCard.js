import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onEditPlant }) {
  const {name, image, price} = plant
  const [isInStock, setIsInStock] = useState(true)
  const [edit, setEdit] = useState(false)
  const [newPrice, setNewPrice] = useState(price)

  function handleStockButtonClick() {
    setIsInStock(() => !isInStock)
  }

  function handleDeleteButtonClick() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }})
      .then(res => res.json())
      .then(() => onDeletePlant(plant))
  }

  function handleEditButtonClick() {
    setEdit(() => !edit)
  }

  function handlePriceChange(e) {
    setNewPrice(e.target.value)
  }

  function handleNewPriceSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: newPrice
      })
    })
      .then(res => res.json())
      .then((plant) => onEditPlant(plant))
      .then(() => setEdit(() => !edit))
    
  }

  function newPriceForm() {
    return (
      <form onSubmit={handleNewPriceSubmit}>
        <label>New price: </label>
        <input
          onChange={handlePriceChange}
          style={{'border':'solid'}}
          type="text"
          placeholder="Enter new price...">
        
        </input>
      </form>
    )
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {edit ? newPriceForm() : <p>Price: {price}</p>}
      <button onClick={handleStockButtonClick} className={isInStock ? "primary": ""}>
        {isInStock ? 'In Stock' : 'Out of Stock' }
      </button>
      <button onClick={handleEditButtonClick}>Edit Price</button>
      <button onClick={handleDeleteButtonClick}>Delete Plant</button>
      
    </li>
  );
}

export default PlantCard;
