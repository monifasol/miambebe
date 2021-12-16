import { Link } from "react-router-dom";
import { useContext } from "react";        
import CurrentBabyNav from "./CurrentBabyNav";               
import { DataContext } from "../../context/data.context";
import logo from "../../images/logo.png"

const Navbar = () => {

  const { isLoggedIn, logOutUser, currentBaby, currentUser, userDevice } = useContext(DataContext);

  return (
    <nav className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="logo miam bebe" />
      </Link>

      {isLoggedIn
        ? 
          (<>
            
            { currentBaby && <CurrentBabyNav currentBaby={currentBaby} currentUser={currentUser} /> }  
                
            <div className="only-desktop">

              <Link to="/">
                <span className="link">Week plan</span>
              </Link>
              <Link to="/profile">
                <span className="link">Profile</span>
              </Link>
              <Link to="/profile">
                <span className="link">Profile</span>
              </Link>

              <span onClick={logOutUser} className="link">Logout</span>
            </div>
          </>)
        : 
          (<>
              <div className="singup">
                { userDevice !== "mobile" && <p>Don't have an account yet?</p> }
                <Link to="/signup"> <span className='btn'>Signup</span> </Link>
              </div>

              <div className="login">
                { userDevice !== "mobile" && <p>Already have account?</p> }
                <Link to="/login"> <span className='btn'>Login</span> </Link>
              </div>
            
          </>)
      }
    </nav>
  );
}

export default Navbar;