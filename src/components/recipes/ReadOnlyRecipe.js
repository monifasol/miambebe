import React from 'react'
import Moment from 'react-moment';


const ReadOnlyRecipe = ( {recipe} ) => {

    return (
        <>
            
            <p className="title">
                { recipe.title }
            </p>
                
            <p className="writter">
                    by {recipe.user && recipe.user.name}, 
                    on <Moment fromNow>{recipe.timestamp}</Moment>
            </p>

            <div className="bar-bottom">
                <p className="prep-time">
                    Preparation time: {recipe.preparationTime} min
                </p>

                <p className="difficulty">
                    difficulty: {recipe.difficulty} 
                </p>
            </div>

            <p className="content">
                { recipe.content}
            </p>


            <div className="tags-section-bottom">
                <p className="intolerances">
                    <span className="intolerances-label">Possible intolerances: </span>
                    { recipe.intolerances && recipe.intolerances.map((into, i) => 
                        <span className="tag" key={i}> {into} </span>
                    ) }
                </p>   

                <p> 
                    { recipe.tags && recipe.tags.map((tag, i) => 
                        <span className="tag" key={i}> {tag} </span>
                    ) }
                </p>
            </div> 

        </>
    )
}

export default ReadOnlyRecipe