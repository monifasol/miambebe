import {React, useState, useEffect} from 'react'

import btnLess from "../../images/btn-less.png"
import btnMore from "../../images/btn-more.png"

const GoalForm = ( props ) => {

    const { goal, handleSubmit, buildError } = props

    const [ formState, setFormState ] = useState({})

    
    // Initialize the form with the Goal information
    useEffect( ()=> {
            console.log("Im going to set FormState NOW: ")

            setFormState({
              quantityGoal: goal.quantityGoal,
              quantityAccomplished: goal.quantityAccomplished,
              foodgroup: goal.foodgroup
            })

            //setFormState(Object.assign({}, formState, {quantityGoal: goal.quantityGoal}))
            //setFormState(Object.assign({}, formState, {quantityAccomplished: goal.quantityAccomplished}))
            //setFormState(Object.assign({}, formState, {foodgroup: goal.foodgroup}))
    }, [])


    const handleChange = (e) => {
      const {name, value } = e.target

      console.log("name======>", name)
      console.log("value======>", value)

      if (Number.isNaN(parseInt(value))) buildError()
      else {
        setFormState(Object.assign({}, formState, {[name]: value}))
        console.log("formState", formState)
        handleSubmit(goal, formState.foodgroup, formState.quantityGoal, formState.quantityAccomplished )
      }
    }

    const submitField = () => {
      handleSubmit(
        goal, 
        formState.foodgroup, 
        formState.quantityGoal, 
        formState.quantityAccomplished
      )
    }

    const increaseQuantityGoal = (e) => {
      setFormState(
          Object.assign({}, formState, {quantityGoal: parseInt(formState.quantityGoal) + 1})
      )
      submitField()
    }

    const decreaseQuantityGoal = (e) => {
      if (parseInt(formState.quantityGoal) > 0) {
          setFormState(
              Object.assign({}, formState, {quantityGoal: parseInt(formState.quantityGoal) - 1})
          )
          submitField()
      }
    }

    const increaseQuantityAccomplished = (e) => {
      setFormState(
          Object.assign({}, formState, {quantityAccomplished: parseInt(formState.quantityAccomplished) + 1})
      )
      submitField()
    }

    const decreaseQuantityAccomplished= (e) => {
      if (parseInt(formState.quantityAccomplished) > 0) {
          setFormState(
              Object.assign({}, formState, {quantityAccomplished: parseInt(formState.quantityAccomplished) - 1})
          )
          submitField()
      }
    }


    return (
        <div>
              
            <form className={(!formState.quantityGoal || formState.quantityGoal === 0) ? "form form-goal empty" : "form form-goal" } >

                <div className="group-inputs-goal">
                  
                    <input disabled="disabled" 
                            type="text" 
                            name="foodgroup" 
                            className="input-foodgroup"
                            value={(formState.foodgroup && formState.foodgroup.name) || ""} />   
                    
                    <input type="text" 
                            name="quantityGoal" 
                            value={formState.quantityGoal || 0} 
                            onChange={ (e)=> { handleChange(e) }} 
                    />

                    <div className="goal-buttons">
                      <img src={btnMore} alt="increase quantity goal" className="btn-more" onClick={ (e)=> increaseQuantityGoal(e) } />
                      <img src={btnLess} alt="decrease quantity goal" className="btn-less" onClick={ (e)=> decreaseQuantityGoal(e) } />
                    </div>

                </div>


                <div className="group-inputs-goal given">
                    
                    <input type="text" 
                            name="quantityAccomplished" 
                            value={formState.quantityAccomplished || 0} 
                            onChange={ (e)=> { handleChange(e) }}
                    />

                    <div className="goal-buttons">
                      <img src={btnMore} alt="increase quantity goal" className="btn-more" onClick={ (e)=> increaseQuantityAccomplished(e) } />
                      <img src={btnLess} alt="decrease quantity goal" className="btn-less" onClick={ (e)=> decreaseQuantityAccomplished(e) } />
                    </div>
                </div>

            </form>

        </div>
    )
}

export default GoalForm
