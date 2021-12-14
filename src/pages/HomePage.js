import Week from "./../components/weekly-food-plan/Week";
import Databoard from "../components/databoard/Databoard"
import RecipesOverview from "./../components/recipes/RecipesOverview"

import { React, useContext, useState, useEffect } from "react";        
import { CurrentDataContext } from "../context/currentData.context";

import axios from "axios";
import env from "react-dotenv";

const token = localStorage.getItem("authToken");
const API_URI = env.SERVER_API_URL;


function HomePage() {

  const { currentWeek, foodgroups } = useContext(CurrentDataContext);

  const [goals, setGoals] = useState(null)
  const [isError, setIsError] = useState(false)

  const [isInitializingGoals, setIsInitializingGoals] = useState(true)    // goals for the week


/*
              // ADD SORTING BY GOALS?
                const sortyByGoal = (a, b) => {
                    if (a.quantityGoal < b.quantityGoal) return 1
                    if (a.quantityGoal > b.quantityGoal) return -1
                    else return 0
                } 
      
                const sortedGoals = goals.sort(sortyByGoal)
*/



    // API request that populates 'goals' for the currentWeek, otherwise week.goals is only ID's
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


    // Inits state variable GOALS, if week has already goals (first, API call to populate them)
    useEffect( () => {
      if (currentWeek && currentWeek.goals && currentWeek.goals.length > 0) {
  
           axios
              .get(`${API_URI}/weeks/${currentWeek._id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
              .then((response) => {
                  const foundWeek = response.data.data
                  const populatedGoals = foundWeek.goals    
                  setGoals(populatedGoals)                  // POPULATED GOALS
          
                  setTimeout(() => { setIsInitializingGoals(false) }, 1000)
                })
              .catch((error) => console.log(error)); 
        
      } 
    }, [currentWeek])


    // Init goals for an empty week 
    const initWeekFoodPlan = () => {

      //console.log("Init goals for an empty weelk =====>", currentWeek.firstday)

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
      //console.log("currentWeek now has goals ===> ", currentWeek.goals.length)
  }



  // Handle submit for Week > FormGoal

  const handleSubmit = (e, goal, foodgroup, quantityGoal, quantityAccomplished) => {

    e.preventDefault();

    if (currentWeek && foodgroup) {
      const requestBody = { foodgroupId: foodgroup._id, quantityGoal, quantityAccomplished, weekId: currentWeek._id }
      
      axios
        .put(`${API_URI}/goals/${goal._id}`, requestBody, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          let updatedGoal = response.data.data
          //console.log(`Goal successfully updated with id ${updatedGoal._id}`)

          // get goals for the week and re-recreate state variable
          axios
          .get(`${API_URI}/weeks/${currentWeek._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          .then((response) => {
              const foundWeek = response.data.data
              const populatedGoals = foundWeek.goals      // goals are now populated
              setGoals(populatedGoals)                    // STATE VARIABLE WITH GOALS UPDATED!
            })
          .catch((error) => console.log(error)); 
        })
        .catch((error) => console.log(error));
    }
  };

  
  return (
    <div className="homepage">
      <h1>Your dashboard</h1>
      
      <div className="homepage-flex">

        <Week week={currentWeek} 
              goals={goals} 
              isInitializingGoals={isInitializingGoals} 
              initWeekFoodPlan={initWeekFoodPlan}
              handleSubmit={handleSubmit}
              />

        <div className="homepage-flex-left-side">
          <Databoard goals={goals} />
          <RecipesOverview />  
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;