import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { DataContext } from "./../context/data.context";


const API_URI = process.env.REACT_APP_API_URL;


function LoginPage(props) {

  const history = useHistory()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(DataContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios

      .post(`${API_URI}/auth/login`, requestBody)
      .then((response) => {
        const JWTToken = response.data.authToken;
        logInUser(JWTToken);
        history.push("/");
      })
      .catch((error) => {
        const errorDescription = `There has been an error: ${error}`;
        setErrorMessage(errorDescription);
      });
  };

  return (

    <>
      
      <div className="welcome-msg">
          <p>Welcome to Miam Bebe! </p>
          <p>A food tracker for babies...  <span class="small">(and parents!)</span></p>
      </div>

      <div className="login-page">
        <h1>Login</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <form onSubmit={handleLoginSubmit} className="form">
          <div className="fields">
            <label>Email:</label>
            <input type="text" name="email" value={email} onChange={handleEmail} />
          </div>

          <div className="fields">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <button type="submit" className="btn">Login</button>

        </form>              
      </div>

      <div className="login-page">
          <p>Don't have an account yet?</p>
          <Link to="/signup"> <span className='btn'>Signup</span> </Link>
      </div>
    </>
  );
}

export default LoginPage;
