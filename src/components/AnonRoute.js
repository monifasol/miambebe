import { useContext } from "react";
import { DataContext } from "../context/data.context";
import { Redirect, Route } from "react-router-dom";


function AnonRoute(props) {
  const { to, exact, component: Component, ...restProps } = props;
  
  const { isLoggedIn, isLoading } = useContext(DataContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  // If the user is already logged in, redirect him to home page
  if (isLoggedIn) return <Redirect to="/" />;

  // If the user is not logged in yet, allow him to see the page
  return <Route to={to} exact={exact} component={Component} {...restProps} />
}

export default AnonRoute;