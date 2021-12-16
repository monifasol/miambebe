import React, { useState, useEffect } from "react";
import axios from "axios";

const localJWTToken = localStorage.getItem("authToken");
const API_URI = process.env.REACT_APP_API_URL;

const DataContext = React.createContext();

function DataProviderWrapper(props) {

  // AUTH state variables 

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);                 // this user only contains the Token content ({ _id, email, name })

    
  // Current data state variables
  const [currentUser, setCurrentUser] = useState(null);   // this user will contain the full user model
  const [currentBaby, setCurrentBaby] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [foodgroups, setFoodgroups] = useState(null);
  const [userDevice, setUserDevice] = useState("");


  // ====== Auth methods ========

   const verifyToken = () => {
    
    if (localJWTToken) {
      axios
        .get(`${API_URI}/auth/verify`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          const userJWT = response.data;
          setUser(userJWT);     
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setUser(null);
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const logInUser = (JWTToken) => {
    localStorage.setItem("authToken", JWTToken);
    verifyToken(); // We don't send token here, since verify will read it from localStorage.
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    verifyToken();
  }, []);


   // fetches currentUser (full user model)
   useEffect( ()=> {
    if (user) {
      axios
      .get(`${API_URI}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${localJWTToken}` },
      })
      .then((response) => {
          const foundUser = response.data.data;
          setCurrentUser(foundUser);
        })
        .catch((error) => {
          console.log(error);
          console.log("error===>", error)
        });
    }
  }, [user])


  // Set the type of device the user is using
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setUserDevice("tablet");
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      setUserDevice("mobile");
    }
    setUserDevice("desktop");
  }, []);


  // initializes currentBaby, when currentUser loads or changes
  useEffect(() => {
    if (currentUser && currentUser.babies) {
      let initBaby = currentUser.babies[0];
      setCurrentBaby(initBaby);
    }
  }, [currentUser]);



  // ========= Week Initialization ============

  const formatDate = (date) => {
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  };

  const getMondaySunday = () => {
    // Find out beginning and end of the week
    const today = new Date();
    const dayWeek = today.getDay();
    const diff = today.getDate() - dayWeek + (dayWeek === 0 ? -6 : 1); // day of month - day of week (-6 if Sunday), otherwise +1
    var firstD = new Date(today.setDate(diff)); // first day
    var lastD = new Date(today.setDate(firstD.getDate() + 6)); // last day --> first day + 6

    let daysObj = { firstday: formatDate(firstD), lastday: formatDate(lastD) };

    return daysObj;
  };

  let firstDayWeek = getMondaySunday().firstday;
  let lastDayWeek = getMondaySunday().lastday;


  const createCurrentWeek = async () => {
    const requestBody = {
      firstday: firstDayWeek,
      lastday: lastDayWeek,
      babyId: currentBaby._id,
    };

    axios
      .post(`${API_URI}/weeks/`, requestBody, {
        headers: { Authorization: `Bearer ${localJWTToken}` },
      })
      .then((response) => {
        // We get the created week; or the original week if it already existed.
        const weekFromAPI = response.data.data;

        // Find week, to populate goals (after CREATE, we don't populate!!)
        axios
          .get(`${API_URI}/weeks/${weekFromAPI._id}`, {
            headers: { Authorization: `Bearer ${localJWTToken}` },
          })
          .then((response) => {
            let foundWeek = response.data.data;
            setCurrentWeek(foundWeek);
          })
          .catch((error) => console.log("Error in week creation: ", error));
      })
      .catch((error) => console.log("Error in week creation: ", error));
  };

  // Create the Current Week for this time and current Baby; if it alreayd exists, the backend will not let us.
  useEffect(() => {
    if (currentBaby) createCurrentWeek();
  }, [currentBaby]);


  // Init foodggroups
  useEffect(() => {
    if (localJWTToken) {
      axios
        .get(`${API_URI}/foodgroups`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          const foundGroups = response.data.data;
          setFoodgroups(foundGroups);
        })
        .catch((e) => {
          setFoodgroups(null);
          console.log(e);
        });
    }
  }, []);


  return (
    <DataContext.Provider
      value={{
        logInUser, 
        logOutUser, 
        user, 
        isLoggedIn, 
        isLoading, 
        currentBaby,
        currentUser,
        currentWeek,
        foodgroups,
        userDevice
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export { DataProviderWrapper, DataContext };
