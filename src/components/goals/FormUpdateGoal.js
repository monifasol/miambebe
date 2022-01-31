import {React, useState, useEffect} from 'react'

import btnLess from "../../images/btn-less.png"
import btnMore from "../../images/btn-more.png"

const FormUpdateGoal = ( props ) => {

    const { goal, handleSubmit, buildError } = props

    const [ quantityGoal, setQuantityGoal ] = useState(goal.quantityGoal)
    const [ quantityAccomplished, setQuantityAccomplished ] = useState(goal.quantityAccomplished)
    const [ foodgroup, setFoodgroup ] = useState(goal.foodgroup)


    // Initialize the form with the Goal information
    //useEffect( ()=> {
    //        setQuantityGoal(goal.quantityGoal)
    //        setQuantityAccomplished(goal.quantityAccomplished)
    //        setFoodgroup(goal.foodgroup)
    //}, [])


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
        handleSubmit(goal, foodgroup, quantityGoal, value)
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
              
            <form className={(!quantityGoal || quantityGoal === 0) ? "form form-update-goal empty" : "form form-update-goal" } >

                <div className="group-inputs-goal">
                  
                    <input disabled="disabled" 
                            type="text" 
                            name="foodgroup" 
                            className="input-foodgroup"
                            id={ foodgroup && foodgroup.code }
                            value={(foodgroup && foodgroup.name) || ""} />   
                    
                    x
                    <input type="text" 
                            name="quantityGoal" 
                            value={quantityGoal || 0} 
                            onChange={ (e)=> { handleChangeQuantityGoal(e.target.value) }} 
                    />

                </div>

                <div className="group-inputs-goal">
                    <img src={btnLess} alt="decrease quantity goal" className="btn-less" onClick={ (e)=> decreaseQuantityAccomplished(e) } />
                    <input type="text" 
                            name="quantityAccomplished" 
                            value={quantityAccomplished || 0} 
                            onChange={ (e)=> { handleChangeQuantityAccomplished(e.target.value) }}
                    />
                    <img src={btnMore} alt="increase quantity goal" className="btn-more" onClick={ (e)=> increaseQuantityAccomplished(e) } />

                </div>

            </form>
    )
}

export default FormUpdateGoal
