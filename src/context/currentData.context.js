import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import env from "react-dotenv";
import { AuthContext } from "./auth.context";  

const API_URI = env.SERVER_API_URL;
const localJWTToken = localStorage.getItem("authToken");

const CurrentDataContext = React.createContext();



function CurrentDataProviderWrapper(props) {
  
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(null);
  const [currentBaby, setCurrentBaby] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);  
  const [foodgroups, setFoodgroups] = useState(null)

  const prepareCurrentUser = () => {
      axios
        .get(`${API_URI}/users/${user._id}`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          const foundUser = response.data.data
          setCurrentUser(foundUser)

          console.log("Im here and I found the user", foundUser)
        })
        .catch((error) => {
          console.log(error)
          setCurrentUser(null)
        });
  }


  // initializes currentUser, when user (from auth) changes
  // use comes from JWT token and has very little info
  useEffect( () => {    
    if (isLoggedIn && !isLoading) {

      console.log("Im logged in, user is:", user)  
      prepareCurrentUser()
      
    }
  }, [isLoggedIn, isLoading]);



  // initializes currentBaby, when currentUser loads or changes
  useEffect( () => {
    if (currentUser && currentUser.babies) {
      
      let initBaby = currentUser.babies[0]
      setCurrentBaby(initBaby)

    }
  }, [currentUser]);
          


  // ========= Week Initialization

  const formatDate = (date) => {
    return date.getDate() + 
    "-" +  (date.getMonth() + 1) +
    "-" +  date.getFullYear();
  }  

  const getMondaySunday = () => {

      // Find out beginning and end of the week  
      const today = new Date()  
      const dayWeek = today.getDay()                               
      const diff = today.getDate() - dayWeek + (dayWeek === 0 ? -6 : 1)     // day of month - day of week (-6 if Sunday), otherwise +1
      var firstD = new Date(today.setDate(diff))                            // first day
      var lastD = new Date(today.setDate(firstD.getDate() + 6))             // last day --> first day + 6

      let daysObj = { firstday: formatDate(firstD),
                      lastday: formatDate(lastD)}

      return daysObj
  }

  let firstDayWeek = getMondaySunday().firstday
  let lastDayWeek = getMondaySunday().lastday


  // Updates currentBaby when parent switches babies
  const switchBabies = (babyId) => {

    if (babyId) {
      
        axios
        .get(`${API_URI}/babies/${babyId}`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
            const baby = response.data.data
            setCurrentBaby(baby)             // we switched babies
        })
        .catch((error) => {
            console.log(error)
            setCurrentBaby(null)
        });
    } 
  };

        
  const createCurrentWeek = () => {
      const requestBody = {firstday: firstDayWeek, lastday: lastDayWeek, babyId: currentBaby._id}

      axios
        .post(`${API_URI}/weeks/`, requestBody, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          // We get the created week; or the original week if it already existed.
          const weekFromAPI = response.data.data;                
          console.log("======> The current week already existed in API: ", weekFromAPI)
          setCurrentWeek(weekFromAPI);  
        })
        .catch((error) => {
          setCurrentWeek(null);  
          console.log("Error in week creation: ", error)
        });
  }


  // Init foodggroups
  useEffect(() => {
    if (localJWTToken) {
      axios
        .get(`${API_URI}/foodgroups`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
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
  }, [localJWTToken])


  // Create the Current Week for this time and current Baby; if it alreayd exists, the backend will not let us.
  useEffect( () => {
    if (currentBaby) createCurrentWeek()
  }, [currentBaby]);   


  return (
    <CurrentDataContext.Provider
      value={{ currentBaby, currentUser, currentWeek, foodgroups, switchBabies }}
    >
      {props.children}
    </CurrentDataContext.Provider>
  );
}

export { CurrentDataProviderWrapper, CurrentDataContext };
