import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [foodgroups, setFoodgroups] = useState(null);
  const [userDevice, setUserDevice] = useState("");


  // ====== Auth methods ========

   const verifyToken = () => {

    const localJWTToken = localStorage.getItem("authToken");

    if (localJWTToken) {
      axios
        .get(`${API_URI}/auth/verify`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          const userJWT = response.data;
          setUser(userJWT);   
          console.log("I got a user: ", userJWT)
  
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

      const localJWTToken = localStorage.getItem("authToken");

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


  const updateUser = (user) => {
    setCurrentUser(user)
  }

  const updateBaby = (baby) => {
    setCurrentBaby(baby)
  }


  // Init foodggroups
  useEffect(() => {

    const localJWTToken = localStorage.getItem("authToken");

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
        foodgroups,
        userDevice,
        updateUser,
        updateBaby
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export { DataProviderWrapper, DataContext };
