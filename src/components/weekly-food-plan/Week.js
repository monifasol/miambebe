import { React, useContext, useState, useEffect } from "react";        
import Moment from 'react-moment';

import GoalForm from "./GoalForm";
import FormNewBaby from "../babies/FormNewBaby";
import LoadingSpinner from "../layout-elements/LoadingSpinner";

import { CurrentDataContext } from "../../context/currentData.context";

const Week = ( props ) => {
    
    const { week, goals, initWeekFoodPlan, isInitializingGoals, handleSubmit } = props

    const { currentBaby } = useContext(CurrentDataContext);
    const [firstDay, setFirstDay] = useState(null)
    const [lastDay, setLastDay] = useState(null)
    
    // Set the values for start and end dates of the week
    useEffect( () => {
        if (week) {

            const buildDate = (dayStr) => {
                // JS default format is MM/DD/YYYY but we work with DD-MM-YYYY so:
                var dateParts = dayStr.split("-")
                // month is 0-based, that's why we need dataParts[1] - 1
                return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
            }

            setFirstDay(buildDate(week.firstday).toString())
            setLastDay(buildDate(week.lastday).toString())
        } 
    }, [week]);


    // Builds small error when input is not a number (function passed as a CB to children <GoalForm/>)
    const buildError = () => {
        let errorEl = document.querySelector('#form-error .error')
        errorEl.classList.add("show")
        errorEl.textContent = "That's not a number!"
  
        setTimeout( () => {
          errorEl.classList.remove("show")
        }, 1500)
    }

    const openModalNewBaby = () => {
        let overlay = document.getElementById("overlayModals")
        let modalNewBaby = document.getElementById('modalNewBaby')
        modalNewBaby.classList.add("show")
        overlay.classList.add("show")

    }

    const closeModalNewBaby = () => {
        let overlay = document.getElementById("overlayModals")
        let modalNewBaby = document.getElementById('modalNewBaby')
        modalNewBaby.classList.remove("show")
        overlay.classList.remove("show")
    }


    return (
        <div className="week-component comp">

            <div className="modal" id="modalNewBaby">
                <span className="close-modal" onClick={ ()=> closeModalNewBaby()}></span>
                <FormNewBaby /> 
            </div>

            <h2 className="h2-comp">Current Week</h2>
        
            { !currentBaby && 
                <p className="no-baby">
                    First, you need to register your baby(s).
                    <span className="btn" onClick={ ()=> openModalNewBaby() }>Let's start!</span>
                </p>}

            { currentBaby && 

                <p className="dates-current-week">
                    <span>from</span> 
                    <Moment format="DD MMM YYYY">{firstDay}</Moment>
                    <span>to</span> 
                    <Moment format="DD MMM YYYY">{lastDay}</Moment>
                </p>
            }

            { currentBaby && week 
            
                &&

                <>
                    { !goals 
                    
                    ?
                                
                        <div>
                            <p className="text-current-week">There's no food plan set for this week yet! Start now! </p>
                            <p className="text-current-week">What would you like {currentBaby.name } to eat this week?</p> 
                            <p className="btn" onClick={ () => initWeekFoodPlan()}>Set {currentBaby.name}'s food plan </p>
                        </div>

                    :

                        <>
                            { isInitializingGoals && <LoadingSpinner msg="Initializing weekly food plan..."/> }

                            <div id="form-error">
                                <p className="flash-small error">error here</p>
                            </div>

                            <div className="weekly-food-plan">
                                
                                <div className="header-form-goals">
                                    <p><span>Baby's week food plan</span></p>
                                    <p><span>Already accomplished</span></p>
                                </div>

                                { !isInitializingGoals && goals && goals.map(( goal ) => ( 

                                    <GoalForm key={goal._id} 
                                                goal={goal} 
                                                buildError={buildError} 
                                                handleSubmit={handleSubmit}
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

export default Week