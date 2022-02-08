import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, onEditPlant }) {
  return (
    <ul className="cards">
      {plants.map(plant => {
        return <PlantCard 
          key={plant.id}
          plant={plant} 
          onDeletePlant={onDeletePlant}
          onEditPlant={onEditPlant}/>
      })}
    </ul>
  );
}

export default PlantList;
