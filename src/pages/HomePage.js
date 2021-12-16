import Week from "./../components/weekly-food-plan/Week";
import Databoard from "../components/databoard/Databoard"
import Logs from "../components/databoard/Logs"

import { React, useContext, useState, useEffect } from "react";        
import { DataContext } from "../context/data.context";

import axios from "axios";

const token = localStorage.getItem("authToken");
const API_URI = process.env.REACT_APP_API_URL;

function HomePage() {

  const { currentWeek, foodgroups } = useContext(DataContext);

  const [goals, setGoals] = useState(null)
  const [isError, setIsError] = useState(false)

  const [isInitializingGoals, setIsInitializingGoals] = useState(true)    // goals for the week


    // Inits state variable GOALS, if week has already goals
    useEffect( () => {
      if (currentWeek && currentWeek.goals && currentWeek.goals.length > 0) {

          setGoals(currentWeek.goals)
          setTimeout(() => { 
            setIsInitializingGoals(false) 
          }, 1000)
       
      } 
    }, [currentWeek])


    // Init goals for an empty week 
    const initWeekFoodPlan = () => {

      foodgroups.forEach( (foodgroup) => {
          const requestBody = { foodgroupId: foodgroup._id, quantityGoal: 0, quantityAccomplished: 0, weekId: currentWeek._id }
          axios
              .post(`${API_URI}/goals`, requestBody, {
                  headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                  console.log(`Goal set for the week of ${currentWeek.firstday}`)
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
              })
              .catch((error) => { console.log(error)});
      }
  }


  // Handle submit for Week > FormGoal

  const handleSubmit = (goal, foodgroup, quantityGoal, quantityAccomplished) => {

    if (currentWeek && foodgroup) {
      const requestBody = { foodgroupId: foodgroup._id, quantityGoal, quantityAccomplished, weekId: currentWeek._id }
      
      axios
        .put(`${API_URI}/goals/${goal._id}`, requestBody, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {

          // I need an Axios call here, to get the week from the API with its goals updated. 
          // Otherwise, week.goals do not reflect the updated goals.          
          axios
              .get(`${API_URI}/weeks/${currentWeek._id}`, requestBody, {
                  headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                  let foundWeek = response.data.data
                  setGoals(foundWeek.goals)
              })
              .catch((error) => {
                  setIsError(true)
                  console.log(error)
              });
        })
        .catch((error) => console.log(error));
    }
  };

  
  return (
    <div className="homepage">
      
      <div className="homepage-flex">

        <Week week={currentWeek} 
              goals={goals} 
              isInitializingGoals={isInitializingGoals} 
              initWeekFoodPlan={initWeekFoodPlan}
              handleSubmit={handleSubmit}
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