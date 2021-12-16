import {React, useContext} from 'react'
import { Link } from "react-router-dom";
import { DataContext } from "../../context/data.context";  

import iconDashboard from "../../images/icon-dashboard.png"
import iconLogout from "../../images/icon-logout.png"
import iconRecipes from "../../images/icon-recipes.png"
import iconProfile from "../../images/icon-profile.png"


const FooterMenu = () => {

    const { isLoggedIn, logOutUser } = useContext(DataContext);

    return (
        <>
         {isLoggedIn &&
            <div className="footer-menu">
        
                <>
                    <Link to="/">
                        <img src={iconDashboard} className="link" alt="icon dashboard"/>
                    </Link>
                    
                    <Link to="/recipes">
                        <img src={iconRecipes} className="link" alt="icon recipes"/>
                    </Link>

                    <Link to="/profile">
                        <img src={iconProfile} className="link profile" alt="icon profile"/>
                    </Link>

                    <img onClick={logOutUser} src={iconLogout} className="link logout" alt="icon logout"/>

                </>
            </div>
        }
        
        </>
    )
}

export default FooterMenu