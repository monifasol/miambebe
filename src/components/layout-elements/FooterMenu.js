import {React, useContext} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";  

const FooterMenu = () => {

    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="footer-menu">
            {isLoggedIn &&
            
                (<>
                    <Link to="/">
                        <span className="link">Week Dashboard</span>
                    </Link>
                    
                    <Link to="/recipes">
                        <span className="link">Recipes</span>
                    </Link>

                    <Link to="/profile">
                        <span className="link">Profile</span>
                    </Link>

                </>)
            }
        </div>
    )
}

export default FooterMenu