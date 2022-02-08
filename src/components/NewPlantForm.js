import React, { useState } from "react";

function NewPlantForm({ onNewPlantSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  })

  function handleNewItem(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newPlant => onNewPlantSubmit(newPlant))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleNewItem} type="text" name="name" placeholder="Plant name" />
        <input onChange={handleNewItem} type="text" name="image" placeholder="Image URL" />
        <input onChange={handleNewItem} type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
