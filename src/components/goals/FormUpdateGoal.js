import {React, useState, useContext} from 'react'
import axios from 'axios';

import btnLess from "../../images/btn-less.png"
import btnMore from "../../images/btn-more.png"

// data
import { DataContext } from "../../context/data.context";
const token = localStorage.getItem("authToken");
const API_URI = process.env.REACT_APP_API_URL;

const FormUpdateGoal = ( props ) => {

    const { currentBaby } = useContext(DataContext);

    const { goal, buildError, fetchGoals } = props

    const [ quantityGoal, setQuantityGoal ] = useState(goal.quantityGoal)
    const [ quantityAccomplished, setQuantityAccomplished ] = useState(goal.quantityAccomplished)
    const [ foodgroup, setFoodgroup ] = useState(goal.foodgroup)


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

      // Handle submit for FormUpdateGoal. Updates information of a Goal.
      const handleSubmit = (goal, foodgroup, quantityGoal, quantityAccomplished) => {
      
        const requestBody = { 
          foodgroupId: foodgroup && foodgroup._id, 
          quantityGoal, 
          quantityAccomplished, 
          babyId: currentBaby._id 
        }
  
        axios
          .put(`${API_URI}/goals/${goal._id}`, requestBody, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const updatedGoal = response.data.data
            console.log(`Goal with id ${updatedGoal._id} updated, for baby ${currentBaby._id}`)
            fetchGoals()
          })
          .catch((error) => console.log(error));
  
      };


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
