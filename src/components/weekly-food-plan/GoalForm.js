import {React, useState, useContext, useEffect} from 'react'
import axios from "axios"
import env from "react-dotenv";

import { CurrentDataContext } from '../../context/currentData.context';
import { DataboardContext } from "../../context/databoard.context";

import btnLess from "../../images/btn-less.png"
import btnMore from "../../images/btn-more.png"

const API_URI = env.SERVER_API_URL;

const GoalForm = ( props ) => {

    const { goal } = props

    const { currentWeek } = useContext(CurrentDataContext);
    const { buildGoalsArrObj } = useContext(DataboardContext);

    const [quantityGoal, setQuantityGoal] = useState(0)
    const [quantityAccomplished, setQuantityAccomplished ] = useState(0)
    const [foodgroup, setFoodgroup ] = useState("")

    const token = localStorage.getItem("authToken")

    // Initialize the form with the Goal information
    useEffect( ()=> {
            setQuantityGoal(goal.quantityGoal)
            setQuantityAccomplished(goal.quantityAccomplished)
            setFoodgroup(goal.foodgroup)
    }, [goal])


    // API request that populates 'foodgroup' for the Goal
    useEffect( ()=> {
      if (goal) {

        axios
          .get(`${API_URI}/goals/${goal._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          .then((response) => {
              const foundGoal = response.data.data
              setFoodgroup(foundGoal.foodgroup)
            })
          .catch((error) => console.log(error));   
      }
    }, [goal, token])


    const handleSubmit = (e) => {
      e.preventDefault();

      if (currentWeek && foodgroup) {
        const requestBody = { foodgroupId: foodgroup._id, quantityGoal, quantityAccomplished, weekId: currentWeek._id }
        
        axios
          .put(`${API_URI}/goals/${goal._id}`, requestBody, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            let updatedGoal = response.data.data
            console.log(`Goal successfully updated with id ${updatedGoal._id}`)

            // get goals for the week and re-build object in Context

            axios
            .get(`${API_URI}/weeks/${currentWeek._id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
            .then((response) => {
                const foundWeek = response.data.data
                const populatedGoals = foundWeek.goals      // goals are now populated
                buildGoalsArrObj(populatedGoals)            // calls function that inits array of goals objects
              })
            .catch((error) => console.log(error)); 


          })
          .catch((error) => console.log(error));
      }
    };

    const setQGoal = (value) => {

      if (Number.isNaN(parseInt(value))) props.buildError()
      else setQuantityGoal(value)
    }

    const setQAccomplished = (value) => {

      if (Number.isNaN(parseInt(value))) props.buildError()
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
        
            <form onSubmit={handleSubmit} className='form form-goal'>

                <div className="group-inputs-goal">
                  
                    <input disabled="disabled" 
                            type="text" 
                            name="foodgroup" 
                            className="input-foodgroup"
                            value={foodgroup.name || ""} />   
                    
                    <img src={btnLess} 
                        alt="decrease quantity goal" 
                        className="btn-less"
                        onClick={ ()=>decreaseQuantityGoal() }                   
                    />

                    <input type="text" 
                            name="quantityGoal" 
                            value={quantityGoal || 0} 
                            className="input-quantity-goal"
                            onChange={ (e)=> setQGoal(e.target.value) } 
                    />

                    <img src={btnMore} 
                        alt="increase quantity goal" 
                        className="btn-more"
                        onClick={ ()=> increaseQuantityGoal() } 
                    />
                </div>


                <div className="group-inputs-goal given">
                    <img src={btnLess} 
                          alt="decrease quantity goal" 
                          className="btn-less"
                          onClick={ ()=>decreaseQuantityAccomplished() }                   
                    />

                    <input type="text" 
                            name="quantityAccomplished" 
                            value={quantityAccomplished || 0} 
                            className='input-quantity-accomplished'
                            onChange={ (e)=> setQAccomplished(e.target.value) }
                    />

                    <img src={btnMore} 
                          alt="increase quantity goal" 
                          className="btn-more"
                          onClick={ ()=> increaseQuantityAccomplished() } 
                    />
                </div>

                <button type="submit" className="btn">Save</button>
            </form>

        </div>
    )
}

export default GoalForm
