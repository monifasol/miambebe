import React from 'react'

const RecipeCard = ({ title, description }) => {
  return (
    <div className="recipe-card">
      <h3>{title}</h3>
      <h4>Description:</h4>
      <p>{description}</p>
    </div>
  )
}

export default RecipeCard;
