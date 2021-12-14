import {React, useState, useContext, useEffect} from 'react'

import btnLess from "../../images/btn-less.png"
import btnMore from "../../images/btn-more.png"

const GoalForm = ( props ) => {

    const { goal, handleSubmit, buildError } = props

    const [quantityGoal, setQuantityGoal] = useState(0)
    const [quantityAccomplished, setQuantityAccomplished ] = useState(0)
    const [foodgroup, setFoodgroup ] = useState("")
    
    // Initialize the form with the Goal information
    useEffect( ()=> {
            setQuantityGoal(goal.quantityGoal)
            setQuantityAccomplished(goal.quantityAccomplished)
            setFoodgroup(goal.foodgroup)
    }, [goal])


    useEffect( ()=> {
      if (goal) {
        setFoodgroup(goal.foodgroup)
      }
    }, [goal]);


    const setQGoal = (value) => {
      if (Number.isNaN(parseInt(value))) buildError()
      else setQuantityGoal(value)
    }

    const setQAccomplished = (value) => {
      if (Number.isNaN(parseInt(value))) buildError()
      else setQuantityAccomplished(value)
    }

    const decreaseQuantityGoal = () => {
      if (quantityGoal > 0) setQuantityGoal(quantityGoal - 1)
    }

    const increaseQuantityGoal = () => {
      setQuantityGoal(quantityGoal + 1)
    }

    const decreaseQuantityAccomplished = () => {
      if (quantityAccomplished  > 0) setQuantityAccomplished (quantityAccomplished  - 1)
    }

    const increaseQuantityAccomplished  = () => {
      setQuantityAccomplished (quantityAccomplished  + 1)
    }

    return (
        <div>
              
            <form className={(!quantityGoal || quantityGoal === 0) ? "form form-goal empty" : "form form-goal" }  
                  onSubmit={ (e)=>{handleSubmit(e, goal, foodgroup, quantityGoal, quantityAccomplished)} } >

                <div className="group-inputs-goal">
                  
                    <input disabled="disabled" 
                            type="text" 
                            name="foodgroup" 
                            className="input-foodgroup"
                            value={foodgroup.name || ""} />   
                    
                    <input type="text" 
                            name="quantityGoal" 
                            value={quantityGoal || 0} 
                            onChange={ (e)=> setQGoal(e.target.value) } 
                    />

                    <div className="goal-buttons">
                      <img src={btnMore} alt="increase quantity goal" className="btn-more" onClick={ ()=> increaseQuantityGoal() } />
                      <img src={btnLess} alt="decrease quantity goal" className="btn-less" onClick={ ()=> decreaseQuantityGoal() } />
                    </div>

                </div>


                <div className="group-inputs-goal given">
                    
                    <input type="text" 
                            name="quantityAccomplished" 
                            value={quantityAccomplished || 0} 
                            onChange={ (e)=> setQAccomplished(e.target.value) }
                    />

                    <div className="goal-buttons">
                      <img src={btnMore} alt="increase quantity goal" className="btn-more" onClick={ ()=> increaseQuantityAccomplished() } />
                      <img src={btnLess} alt="decrease quantity goal" className="btn-less" onClick={ ()=> decreaseQuantityAccomplished() } />
                    </div>
                </div>

                <button type="submit" className="btn">Save</button>
            </form>

        </div>
    )
}

export default GoalForm
