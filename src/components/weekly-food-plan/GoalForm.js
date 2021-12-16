import {React, useState, useEffect} from 'react'

import btnLess from "../../images/btn-less.png"
import btnMore from "../../images/btn-more.png"

const GoalForm = ( props ) => {

    const { goal, handleSubmit, buildError } = props

    const [ quantityGoal, setQuantityGoal ] = useState(0)
    const [ quantityAccomplished, setQuantityAccomplished ] = useState(0)
    const [ foodgroup, setFoodgroup ] = useState("")

    
    // Initialize the form with the Goal information
    useEffect( ()=> {
            setQuantityGoal(goal.quantityGoal)
            setQuantityAccomplished(goal.quantityAccomplished)
            setFoodgroup(goal.foodgroup)
    }, [])


    const handleChangeQuantityGoal = (value) => {
     
      if (Number.isNaN(parseInt(value))) buildError()
      else {
        setQuantityGoal(value)
        handleSubmit(goal, foodgroup, value, quantityAccomplished )
      }
    }

    const handleChangeQuantityAccomplished = (value) => {
      
      if (Number.isNaN(parseInt(value))) buildError()
      else {
        setQuantityAccomplished(value)
        handleSubmit(goal, foodgroup, quantityGoal, value )
      }
    }

    const increaseQuantityAccomplished = (e) => {
      let value = parseInt(quantityAccomplished) + 1
      handleChangeQuantityAccomplished(value)
    }

    const decreaseQuantityAccomplished = (e) => {
      if (quantityAccomplished > 0) {
        let value = parseInt(quantityAccomplished) - 1
        handleChangeQuantityAccomplished(value)
      }
    }


    return (
        <div>
              
            <form className={(!quantityGoal || quantityGoal === 0) ? "form form-goal empty" : "form form-goal" } >

                <div className="group-inputs-goal">
                  
                    <input disabled="disabled" 
                            type="text" 
                            name="foodgroup" 
                            className="input-foodgroup"
                            value={(foodgroup && foodgroup.name) || ""} />   
                    
                    x
                    <input type="text" 
                            name="quantityGoal" 
                            value={quantityGoal || 0} 
                            onChange={ (e)=> { handleChangeQuantityGoal(e.target.value) }} 
                    />

                </div>


                <div className="group-inputs-goal given">
                    <img src={btnMore} alt="increase quantity goal" className="btn-more" onClick={ (e)=> increaseQuantityAccomplished(e) } />
                      
                    <input type="text" 
                            name="quantityAccomplished" 
                            value={quantityAccomplished || 0} 
                            onChange={ (e)=> { handleChangeQuantityAccomplished(e.target.value) }}
                    />

                    <img src={btnLess} alt="decrease quantity goal" className="btn-less" onClick={ (e)=> decreaseQuantityAccomplished(e) } />
                </div>

            </form>

        </div>
    )
}

export default GoalForm
