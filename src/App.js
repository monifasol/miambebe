import { Switch } from "react-router-dom";

import Navbar from "./components/layout-elements/Navbar";
import FooterMenu from "./components/layout-elements/FooterMenu";

import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import PrivateRoute from "./components/PrivateRoute";    
import AnonRoute from "./components/AnonRoute";        

function App() {
  return (
    <div className="App">  
      <Navbar />

      <Switch>      
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/recipes" component={RecipesPage} />
        <PrivateRoute exact path="/recipes/:id" component={RecipeDetailsPage} />
        {/* Profile page */}
        
        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />
      </Switch>

      <div id="footerMenu">
        <FooterMenu />
      </div>
    </div>
  );
}

export default App;
