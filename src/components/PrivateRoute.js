import { useContext } from "react";
import { DataContext } from "../context/data.context";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  // Destructure the props
  const { to, exact, component: Component, ...restProps } = props;
  
  const { isLoggedIn, isLoading } = useContext(DataContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;


  console.log("LOGGEED IN: ", isLoggedIn.toString())

  // If the user is not logged in ❌
  if (!isLoggedIn) return <Redirect to="/login" />;

  // If the user is logged in ✅
	return <Route to={to} exact={exact} component={Component} {...restProps} />
}

export default PrivateRoute;