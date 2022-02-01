import { React, useContext, useState } from "react";        
import { DataContext } from "../../context/data.context";
import axios from "axios";
import { showNotification } from '../../utils/ui.utils'

const token = localStorage.getItem("authToken");
const API_URI = process.env.REACT_APP_API_URL;


const FormNewGoal = (props) => {
  
    const initialFormState = {
        foodgroupId: 'init',
        quantityGoal: 0
    }

    const { foodgroups, currentBaby } = useContext(DataContext);
    const [ formState, setFormState] = useState(initialFormState);

    const tooltipEl = document.querySelector('.tooltip-form.new-goal.info')
    const tooltipErr = document.querySelector('.tooltip-form.new-goal.error')
    
    const handleInput = (e) => {
        let {name, value } = e.target       
        let newState = Object.assign({}, formState, {[name]: value})
        setFormState(newState)
    }

    // Handle's submit for Form New Goal

    const handleSubmitNewGoal = (e) => {
        e.preventDefault()

        if ( Object.keys(formState).length === 0 ) {
            showNotification(tooltipErr, `All fields are empty!`)
            
        } else if (formState.quantityGoal === undefined || formState.quantityGoal === 0)  {
            showNotification(tooltipErr, `You should provide a quatity (in number of portions)!`)

        } else if ( formState.foodgroupId === 'init' 
                    || formState.foodgroupId === undefined 
                    || formState.foodgroupId === "") {
            showNotification(tooltipErr, `You should select a foodgroup from the list!`)

        } else {
            
            const requestBody = { 
                foodgroupId: formState.foodgroupId, 
                quantityGoal: formState.quantityGoal, 
                quantityAccomplished: 0, 
                babyId: currentBaby._id 
              }

            axios
            .post(`${API_URI}/goals`, requestBody, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const newGoal = response.data
                props.fetchGoals()
                showNotification(tooltipEl, `New goal successfully saved!`)
                setFormState(initialFormState)    // reset the form
                console.log(`Goal (${newGoal._id}) successfully saved for baby ${currentBaby._id}`)
            })
            .catch((error) => {
                showNotification(tooltipErr, `Internal error occurred. Goal not saved.`)
                console.log(error)
            });
        }
    }


    return (
    <>
        <form className="form-new-goal">

            <span className="tooltip-form new-goal info"></span>
            <span className="tooltip-form new-goal error"></span>

            <div className="wrapper-form-new-goal">
                <div className="group-fields-new-goal">
                    <label>New goal</label>
                    <select name="foodgroupId" 
                            onChange={ (e) => { handleInput(e)}}
                            defaultValue='init'>
                        <option value="init"> Select a foodgroup </option>
                        { foodgroups && foodgroups.map( (foodgroup) => (
                            <option
                                key={foodgroup._id}
                                className="input-foodgroup"
                                id={foodgroup.code}
                                value={foodgroup._id}>

                                {(foodgroup && foodgroup.name) || ""}

                            </option>
                        )) }
                    </select>
                </div>

                <div className="group-fields-new-goal">
                    <label htmlFor="quantityGoal">Goal <small>(n° of portions)</small></label>
                    <div className="wrapper-input-savebutton">
                        <input type="text" 
                                id="quantityGoal"
                                name="quantityGoal"
                                value={formState.quantityGoal || 0 }
                                onChange={ (e) => handleInput(e) } />

                        <div className="btn new-goal" onClick={ (e) => handleSubmitNewGoal(e) }>Save!</div>
                    </div>
                </div>
            </div>
        </form>
    </>

)};

export default FormNewGoal;