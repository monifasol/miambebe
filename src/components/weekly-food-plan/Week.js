import { React, useContext, useState, useEffect } from "react";        
import Moment from 'react-moment';
import 'moment/locale/fr';

import GoalForm from "./GoalForm";
import LoadingSpinner from "../layout-elements/LoadingSpinner";

import { CurrentDataContext } from "../../context/currentData.context";
import { DataboardContext } from "../../context/databoard.context";

import axios from "axios";
import env from "react-dotenv";
const token = localStorage.getItem("authToken");
const API_URI = env.SERVER_API_URL;


const Week = () => {
    
    const { currentBaby, currentWeek } = useContext(CurrentDataContext);
    const { foodgroups } = useContext(DataboardContext);

    const [firstDay, setFirstDay] = useState(null)
    const [lastDay, setLastDay] = useState(null)

    const [goals, setGoals] = useState(null)
    const [isInitializingGoals, setIsInitializingGoals] = useState(true)
    const [isError, setIsError] = useState(false)


    // API request that populates 'goals' for the currentWeek
    // otherwise, when I iterate over week.goals I only get ID's
    useEffect( ()=> {
        if (currentWeek && currentWeek.goals && currentWeek.goals.length > 0) {  

            let url = `${API_URI}/weeks/${currentWeek._id}`
            axios
                .get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const foundWeek = response.data.data
                    setGoals(foundWeek.goals)
                    setTimeout(() => { setIsInitializingGoals(false) }, 1000)
                })
                .catch((error) => console.log(error));   
        }
      }, [currentWeek])


    // Init currentWeek start and end dates
    useEffect( () => {
        if (currentWeek) {
            setFirstDay(currentWeek.firstday)
            setLastDay(currentWeek.lastday)
        } 
    }, [currentWeek]);


    // Init goals for an empty week. 
    const initWeekFoodPlan = () => {

        console.log("Init goals for an empty weelk =====>", currentWeek.firstday)

        foodgroups.forEach( (foodgroup) => {
        
            const requestBody = { foodgroupId: foodgroup._id, quantityGoal: 0, quantityAccomplished: 0, weekId: currentWeek._id }
        
            axios
                .post(`${API_URI}/goals`, requestBody, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log(`Goal initialized for the week of ${currentWeek.firstday}`)
                })
                .catch((error) => {
                    setIsError(true)
                    console.log(error)
                });
        })
        
        if (!isError) {
            axios
                .get(`${API_URI}/weeks/${currentWeek._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const foundWeek = response.data.data

                    setGoals(foundWeek.goals)
                    setTimeout(() => { setIsInitializingGoals(false) }, 1000)

                    console.log("foundWeek.goals -=========> ", foundWeek.goals)
                    console.log(`Week found with id ${foundWeek._id}`)
                })
                .catch((error) => { console.log(error)});
        }

        console.log("currentWeek now has goals ===> ", currentWeek.goals.length)
    }


    // Inits state variable GOALS, if week has already goals
    useEffect( () => {
        if (currentWeek && currentWeek.goals && currentWeek.goals.length > 0) {
            setGoals(currentWeek.goals)
            setTimeout(() => { setIsInitializingGoals(false) }, 1000)
        } 
    }, [currentWeek])


    // Builds small error when input is not a number (function passed as a CB to children <GoalForm/>)
    const buildError = () => {
        let errorEl = document.querySelector('#form-error .error')
        errorEl.classList.add("show")
        errorEl.textContent = "That's not a number!"
  
        setTimeout( () => {
          errorEl.classList.remove("show")
        }, 1500)
      }


    return (
        <div className="week-component comp">
            <h2 className="h2-comp">Current Week</h2>
        
            <p className="dates-current-week">
                <span>from</span> 
                <Moment locale="fr" format="DD MMMM YYYY">{firstDay}</Moment>
                <span>to</span> 
                <Moment locale="fr" format="DD MMMM YYYY">{lastDay}</Moment>
            </p>

            { !currentBaby && <p>First, you need to register your baby(s).</p>}

            { (currentBaby && !goals) ?
                              
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
                            { !isInitializingGoals && goals && goals.map(( goal ) => ( <GoalForm key={goal._id} goal={goal} buildError={buildError} /> )) }
                        </div>
                    </>
            }
            
        </div>
    )
}

export default Week