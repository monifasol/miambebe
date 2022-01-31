import { React, useContext } from "react";        
import Moment from 'react-moment';
import axios from 'axios';

// components
import FormUpdateGoal from "../goals/FormUpdateGoal";
import FormNewGoal from "../goals/FormNewGoal";
import FormNewBaby from "../babies/FormNewBaby";
import LoadingSpinner from "../layout-elements/LoadingSpinner";

// images
import btnAdd from "../../images/add.png"
import iconDelete from "../../images/icon-delete.png"

// data
import { DataContext } from "../../context/data.context";
const token = localStorage.getItem("authToken");
const API_URI = process.env.REACT_APP_API_URL;

const GoalsDisplay = ( props ) => {
    
    const { currentBaby } = useContext(DataContext);
    const { goals, isLoading, setIsLoading, fetchGoals } = props

    // Builds small error when input is not a number (function passed as a CB to children <FormUpdateGoal/>)
    const buildError = () => {
        let errorEl = document.querySelector('#form-error .error')
        errorEl.classList.add("show")
        errorEl.textContent = "That's not a number!"
  
        setTimeout( () => {
          errorEl.classList.remove("show")
        }, 1500)
    }

    const overlay = document.getElementById("overlayModals")
    const modalNewBaby = document.getElementById('modalNewBaby')

    const toggleModalNewBaby = () => {
        modalNewBaby.classList.toggle("show")
        overlay.classList.toggle("show")
    }

    const showNewGoalForm = () => {
        document.querySelector('.form-new-goal').classList.toggle('show')
    }

    const deleteGoal = (goalId) => {
        setIsLoading(true)
        axios
          .delete(`${API_URI}/goals/${goalId}/${currentBaby._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            console.log(`Goal deleted, for baby ${currentBaby._id}`)
            fetchGoals()
            setTimeout( () => { setIsLoading(false) }, 400)
          })
          .catch((error) => console.log(error));
      }

    const goalsAreEmpty = () => !goals || (goals && goals.length === 0)

    return (
        <div className="goals-component comp">

            <div className="modal" id="modalNewBaby">
                <span className="close-modal" onClick={ ()=> toggleModalNewBaby()}></span>
                <FormNewBaby /> 
            </div>

            <h2 className="h2-comp">Baby's goals</h2>

            <p className="current-date">
                <Moment format="DD MMM YYYY">{Date.today}</Moment>
            </p>
        
            { !currentBaby && 
                <p className="no-baby">
                    First, you need to register a baby.
                    <span className="btn" onClick={ ()=> toggleModalNewBaby() }>Let's start!</span>
                </p>}

            { currentBaby && 

                <>
                    <div className="wrapper-new-goal">
                        <p className="new-goal-header" onClick={showNewGoalForm}>
                            <img src={btnAdd} alt="add a new goal" className="btn-more" />
                            Set a new Goal!
                        </p>
                        <FormNewGoal fetchGoals={props.fetchGoals} />
                    </div>

                    { (!currentBaby || (!isLoading && goalsAreEmpty())) 
            
                        &&
                        
                        <p className="message">
                            There are no goals defined for {currentBaby.name } yet.
                        </p>
                    }

                    {  isLoading && !goalsAreEmpty() &&
                        <LoadingSpinner msg="Loading goals..."/> 
                    }

                    { !isLoading && !goalsAreEmpty() &&
                        <>
                            <div id="form-error">
                                <p className="flash-small error"></p>
                            </div>

                            <div className="header-form-goals">
                                <p><span>Goals</span></p>
                                <p><span>Progress</span></p>
                            </div>

                            { goals.map(( goal ) => ( 

                                <div className="wrapper-goal-row" key={goal._id}>

                                    <FormUpdateGoal  
                                        goal={goal} 
                                        buildError={buildError}
                                        fetchGoals={fetchGoals} /> 
                                    
                                    <img 
                                        className="icon-delete" 
                                        src={iconDelete} 
                                        alt={`delete goal ${goal._id}`} 
                                        onClick={ () => deleteGoal(goal._id)} />

                                </div>
                            )) }
                        </>
                    }
                </>
            }
            
        </div>
    )
}

export default GoalsDisplay