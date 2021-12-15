import { Link } from "react-router-dom";
import { useContext } from "react";        
import CurrentBabyNav from "./CurrentBabyNav";               
import { AuthContext } from "../../context/auth.context";  
import { CurrentDataContext } from "../../context/currentData.context";

const Navbar = () => {

  const { logOutUser } = useContext(AuthContext);
  const { currentBaby, currentUser } = useContext(CurrentDataContext);

  return (
    <nav className="header">
      <Link to="/" className="logo">
        <span className="link">Miam Bebe</span>
      </Link>

      {currentUser
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

            <span>Hello, {currentUser && currentUser.name}!</span>
            <span onClick={logOutUser} className="link">Logout</span>
          </>)
        : 
          (<>

              <div className="singup">
                <p>Don't have an account yet?</p>
                <Link to="/signup"> <span className='btn'>Signup</span> </Link>
              </div>

              <div className="login">
                <p>Already have account?</p>
                <Link to="/login"> <span className='btn'>Login</span> </Link>
              </div>
            
          </>)
      }
    </nav>
  );
}

export default Navbar;