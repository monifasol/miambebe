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
    const [isLoading, setIsLoading] = useState(true)       // Loading Flag for goals loading in Goals Display         

    // Inits state variable GOALS, if week has already goals
    useEffect( () => {
      if (currentBaby) {
        fetchGoals()           // fetches goals and sets goals state variable

        // just to show for a little bit the nice spinner
        setTimeout( () => { setIsLoading(false) }, 800)                 
      }
    }, [currentBaby])

    const fetchGoals = () => {
    
      axios
        .get(`${API_URI}/babies/${currentBaby._id}/goals`, { 
              headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setGoals(response.data.data)
          console.log(`Goals fetched from DB (populated!) after a change in goals.`)
        })
        .catch((error) => console.log(error));
    }
  
    return (
      <div className="homepage">
        
        <div className="homepage-flex">

          <GoalsDisplay 
                goals={goals} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                fetchGoals={fetchGoals} />

          <div className="homepage-flex-left-side">
            <Databoard goals={goals} />
            <Logs />
          </div>
        </div>
        
      </div>
    );
}

export default HomePage;