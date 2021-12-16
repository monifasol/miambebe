import { Switch } from "react-router-dom";
import { useContext } from "react";        

import Navbar from "./components/layout-elements/Navbar";
import FooterMenu from "./components/layout-elements/FooterMenu";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import PrivateRoute from "./components/PrivateRoute";    
import AnonRoute from "./components/AnonRoute";        

import { DataContext } from "./context/data.context";

function App() {

  const { isLoggedIn } = useContext(DataContext);

  return (
    <div className="App">  

      <div id="overlayModals"></div>

      <Navbar />

      <Switch>      
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/recipes" component={RecipesPage} />
        <PrivateRoute exact path="/recipes/:id" component={RecipeDetailsPage} />
        
        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />
      </Switch>

      { isLoggedIn && 
        <div id="footerMenu"><FooterMenu /></div>
      }
    </div>
  );
}

export default App;
