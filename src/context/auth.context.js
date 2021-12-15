import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AuthContext = React.createContext();
const localJWTToken = localStorage.getItem("authToken");

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);               // this user only contains the Token content ({ _id, email, name })

  const verifyToken = () => {
    
    if (localJWTToken) {
      axios
        .get(`${API_URI}/auth/verify`, {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        })
        .then((response) => {
          const userJWT = response.data;
          setUser(userJWT);   
          setIsLoading(false);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          setUser(null);
          setIsLoading(false);
          setIsLoggedIn(false);
        });
    } else {
      // The token is not in localStorage
      setIsLoading(false);
    }
  };

  const logInUser = (JWTToken) => {
    localStorage.setItem("authToken", JWTToken);
    verifyToken(); // We don't wend token here, since verify will read it from localStorage.
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ logInUser, logOutUser, user, isLoggedIn, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
