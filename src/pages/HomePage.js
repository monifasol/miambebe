import GoalsDisplay from "../components/goals/GoalsDisplay";
import Databoard from "../components/databoard/Databoard"
import Logs from "../components/databoard/Logs"

import { React, useContext, useState, useEffect } from "react";        
import { DataContext } from "../context/data.context";

import axios from "axios";

const token = localStorage.getItem("authToken");
const API_URI = process.env.REACT_APP_API_URL;

function HomePage() {

    const { currentBaby } = useContext(DataContext);

    const [goals, setGoals] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    // Inits state variable GOALS, if week has already goals
    useEffect( () => {
      if (currentBaby) {
        setTimeout( () => {
          setGoals(currentBaby.goals)
          setIsLoading(false)
        }, 1000)  // just to show for a little bit the nice spinner
      }
    }, [currentBaby])


    const updateGoals = () => {

      // fetch again from DB, to get the populate!
      axios
        .get(`${API_URI}/babies/${currentBaby._id}/goals`, { 
              headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          const fetchedGoals = response.data.data
          setGoals(fetchedGoals)
          console.log(`Goals fetched from DB (populated!) after adding a new goal.`)
        })
        .catch((error) => console.log(error));
    }

    // Handle submit for FormUpdateGoal. Updates information of a Goal.
    const handleSubmitUpdateGoal = (goal, foodgroup, quantityGoal, quantityAccomplished) => {

      if (foodgroup) {
        
        const requestBody = { 
          foodgroupId: foodgroup._id, 
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
            console.log(`Goal with id ${updatedGoal._id} successfully updated, for baby with id ${currentBaby._id}`)
          })
          .catch((error) => console.log(error));
      }
    };

  
    return (
      <div className="homepage">
        
        <div className="homepage-flex">

          <GoalsDisplay 
                goals={goals} 
                isLoading={isLoading}
                updateGoals={updateGoals}
                handleSubmitUpdateGoal={handleSubmitUpdateGoal}
                />

          <div className="homepage-flex-left-side">
            <Databoard goals={goals} />
            <Logs />
          </div>
        </div>
        
      </div>
    );
}

export default HomePage;