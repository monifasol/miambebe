import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import env from "react-dotenv";

import { CurrentDataContext } from "./currentData.context"

const API_URI = env.SERVER_API_URL;
const token = localStorage.getItem("authToken");

const DataboardContext = React.createContext();


function DataboardProviderWrapper(props) {
  
    const { currentWeek, currentUser } = useContext(CurrentDataContext)

    const [goalsDataboard, setGoalsDataboard] = useState(null)
    const [foodgroups, setFoodgroups] = useState(null)
    const [isDataUpdating, setIsDataUpdating] = useState(true)


    // Calls API request that populates 'goals' for the Week
    // Init Goals Array Object for the current week, used in Databoard

    useEffect( ()=> {
        if (currentWeek && !goalsDataboard) {               // only the first time; this is, if goalsDataboard == null
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
        }
      }, [currentWeek, goalsDataboard])


    function buildGoalsArrObj(goals) {

        setIsDataUpdating(true)

        let populatedFoodgroup = null
        let goalsArrayObj = []

        goals.forEach( (goal, i) => {

            axios  // Aims to populate foodgroup
            .get(`${API_URI}/goals/${goal._id}`, {              
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const foundGoal = response.data.data
                populatedFoodgroup = foundGoal.foodgroup.name

                // create the Goal Object
                const goalObj = {
                    key: i,
                    foodgroup: populatedFoodgroup,
                    quantityGoal: goal.quantityGoal,
                    quantityAccomplished: goal.quantityAccomplished
                }
                // Pushes Object to array of goals objects
                goalsArrayObj.push(goalObj)
            })
            .catch((error) => console.log(error));   
        })

        console.log("Im in Context, re-builing the array of objets: ", goalsArrayObj) 
        
        setGoalsDataboard(goalsArrayObj)       // updated context variable!!!

        setTimeout( () => {
          setIsDataUpdating(false)             // show the spinner for 1 sec
        }, 600)
    }


  // Init foodggroups
  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URI}/foodgroups`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const foundGroups = response.data.data
          setFoodgroups(foundGroups)
        })
        .catch((e) => {
          setFoodgroups(null)
          console.log(e)
        });
      }
  }, [token])


  return (
    <DataboardContext.Provider
      value={{ foodgroups, goalsDataboard, buildGoalsArrObj, isDataUpdating }}
    >
      {props.children}
    </DataboardContext.Provider>
  );
}

export { DataboardProviderWrapper, DataboardContext };


