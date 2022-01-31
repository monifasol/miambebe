import { React, useContext } from "react";        
import Moment from 'react-moment';

import FormUpdateGoal from "../goals/FormUpdateGoal";
import FormNewGoal from "../goals/FormNewGoal";
import FormNewBaby from "../babies/FormNewBaby";
import LoadingSpinner from "../layout-elements/LoadingSpinner";
import btnAdd from "../../images/add.png"

import { DataContext } from "../../context/data.context";

const GoalsDisplay = ( props ) => {
    
    const { currentBaby } = useContext(DataContext);

    const { goals, isLoading, handleSubmitUpdateGoal } = props

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
        // show new form
    }

    return (
        <div className="goals-component comp">

            <div className="modal" id="modalNewBaby">
                <span className="close-modal" onClick={ ()=> toggleModalNewBaby()}></span>
                <FormNewBaby /> 
            </div>

            <h2 className="h2-comp">Baby's goals</h2>
        
            { !currentBaby && 
                <p className="no-baby">
                    First, you need to register a baby.
                    <span className="btn" onClick={ ()=> toggleModalNewBaby() }>Let's start!</span>
                </p>}

            { currentBaby && 

                <>
                    <p className="current-date">
                        <Moment format="DD MMM YYYY">{Date.today}</Moment>
                    </p>

                        
                    { (!goals || (goals && goals.length === 0 )) 
                        &&
                        <p className="message">There are no goals defined for {currentBaby.name } yet.</p>
                    }

                    <FormNewGoal fetchGoals={props.fetchGoals} className="hide" />

                    <p className="add-new-goal">
                        <img src={btnAdd} alt="add a new goal" className="btn-more" onClick={ ()=> showNewGoalForm } />
                        Set a new Goal!
                    </p>

                    { goals && goals.length > 0 &&  
                        
                        <>
                            { isLoading && <LoadingSpinner msg="Loading goals..."/> }

                            <div id="form-error">
                                <p className="flash-small error"></p>
                            </div>

                            <div className="goals-plan">

                                <div className="header-form-goals">
                                    <p><span>Goals</span></p>
                                    <p><span>Progress</span></p>
                                </div>

                                { goals.map(( goal ) => ( 

                                    <FormUpdateGoal key={goal._id} 
                                        goal={goal} 
                                        buildError={buildError} 
                                        handleSubmit={handleSubmitUpdateGoal}
                                        /> 
                                )) }
                            </div>
                        </>
                    }
                </>
            }
            
        </div>
    )
}

export default GoalsDisplay