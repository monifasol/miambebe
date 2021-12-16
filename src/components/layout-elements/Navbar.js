import { Link } from "react-router-dom";
import { useContext } from "react";        
import { DataContext } from "../../context/data.context";
import logo from "../../images/logo.png"
import defaultBabyPic from "../../images/default-avatar.png"


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
            
            { currentBaby && 
            
              <div className="current-logged">
                <img className="baby-avatar-header" src={currentBaby.imageUrl || defaultBabyPic} alt="avatar baby" />
                <div className="text">
                    <span>Hello, {currentUser && currentUser.name}!</span>
                    <span className="baby">{currentBaby.name}, {currentBaby.age} months</span>
                </div>
            </div>
            
            }  
                
            <div className="only-desktop">

              <Link to="/">
                <span className="link">Week plan</span>
              </Link>
              <Link to="/recipes">
                <span className="link">Recipes</span>
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