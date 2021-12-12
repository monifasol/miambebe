import Week from "./../components/weekly-food-plan/Week";
import Databoard from "../components/databoard/Databoard"
import RecipesOverview from "./../components/recipes/RecipesOverview"

function HomePage() {
  return (
    <div className="homepage">
      <h1>Home Page</h1>
      
      <div className="homepage-flex">
        <Week />

        <div className="homepage-flex-left-side">
          <Databoard />
          <RecipesOverview />  
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;