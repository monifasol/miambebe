
import Login from './Login'
import Signup from './Signup'

import logo from "../images/logo.png"
 
const LandingPage = ( {page} ) => {

  return (

    <div className="landing-page">

        <img src={logo} alt="logo miam bebe" className="landing-page-logo"/>
      
        <div className="welcome-msg">
            <p>Welcome to Miam Bebe! </p>
            <p>A food tracker for babies...  <span className="small">(and parents!)</span></p>
        </div>

        { page === 'login' && <Login /> }
        { page === 'signup' && <Signup /> }

    </div>
  );
}

export default LandingPage;
