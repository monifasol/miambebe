import { Link } from "react-router-dom";
import { useContext } from "react";        
import CurrentBabyNav from "./CurrentBabyNav";               
import { AuthContext } from "../../context/auth.context";  
import { CurrentDataContext } from "../../context/currentData.context";

const Navbar = () => {

  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { currentBaby, currentUser } = useContext(CurrentDataContext);

  return (
    <nav className="header">
      <Link to="/" className="logo">
        <span className="link">Miam Bebe</span>
      </Link>

      {isLoggedIn
        ? 
          (<>
            
            { currentBaby && <CurrentBabyNav currentBaby={currentBaby} /> }  
                
            <div className="only-desktop">

              <Link to="/recipes">
                <span className="link">Recipes</span>
              </Link>
              <Link to="/profile">
                <span className="link">Profile</span>
              </Link>
            </div>

            <span>Hello, {currentUser && currentUser.name}!</span> -
            <span onClick={logOutUser} className="link">Logout</span>
          </>)
        : 
          (<>
            <Link to="/signup"> <button>Signup</button> </Link>
            <Link to="/login"> <button>Login</button> </Link>
          </>)
      }
    </nav>
  );
}

export default Navbar;