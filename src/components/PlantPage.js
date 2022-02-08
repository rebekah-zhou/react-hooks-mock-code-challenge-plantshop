import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchBarValue, setSearchBarValue] = useState("")
  
  useEffect(() => {
    fetch(`http://localhost:6001/plants`)
      .then(res => res.json())
      .then(plants => setPlants(plants))
    }, [])

  function handleNewPlant(newPlant) {
    setPlants([...plants, newPlant])
  }

  function handleSearchChange(e) {
    setSearchBarValue(e.target.value.toLowerCase())
  }

  function handleDeletePlant(deletedPlant) {
    const updatedPlants = plants.filter(plant => plant.id !== deletedPlant.id)
    setPlants(updatedPlants)
  }

  function handleEditPlant(updatedPlant) {
    const updatedPlants = plants.map(plant => {
      if(plant.id === updatedPlant.id) {
        return updatedPlant
      } else return plant
    })
    setPlants(updatedPlants)
  }

  const plantsToDisplay = plants.filter(plant => {
    if(searchBarValue.length === 0) {
      return true
    } else {
      return plant.name.toLowerCase().includes(searchBarValue)
    }
  })

  return (
    <main>
      <NewPlantForm onNewPlantSubmit={handleNewPlant}/>
      <Search onSearchChange={handleSearchChange} />
      <PlantList 
        plants={plantsToDisplay} 
        onDeletePlant={handleDeletePlant} 
        onEditPlant={handleEditPlant} />
    </main>
  );
}

export default PlantPage;
