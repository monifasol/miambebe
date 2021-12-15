import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth.context";  


const localJWTToken = localStorage.getItem("authToken");
const API_URI = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log("process.env ===>", process.env)


const CurrentDataContext = React.createContext();


function CurrentDataProviderWrapper(props) {
  
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(null)
  const [currentBaby, setCurrentBaby] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(null)
  const [foodgroups, setFoodgroups] = useState(null)
  const [userDevice, setUserDevice] = useState("")

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


  // Set the type of device the user is using
  useEffect( ()=>{

    const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        setUserDevice("tablet")
      }
      else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        setUserDevice("mobile")
      }
      setUserDevice("desktop")

  }, [])



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

        
  const createCurrentWeek = async () => {
      const requestBody = {firstday: firstDayWeek, lastday: lastDayWeek, babyId: currentBaby._id}

      console.log("requestBody", requestBody)

      axios
        .post(`${API_URI}/weeks/`, requestBody, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          // We get the created week; or the original week if it already existed.
          const weekFromAPI = response.data.data;      
          
          // Find week, to populate goals (when we CREATE in the API, we don't populate!)
          axios
              .get(`${API_URI}/weeks/${weekFromAPI._id}`, {
                headers: { Authorization: `Bearer ${localJWTToken}` },
              })
              .then( (response) => { 
                let foundWeek = response.data.data
                setCurrentWeek(foundWeek) 
              })
              .catch((error) => { console.log("Error in week creation: ", error) });
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
      value={{ currentBaby, currentUser, currentWeek, foodgroups, userDevice, switchBabies }}
    >
      {props.children}
    </CurrentDataContext.Provider>
  );
}

export { CurrentDataProviderWrapper, CurrentDataContext };
