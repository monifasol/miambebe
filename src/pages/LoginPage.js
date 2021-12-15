import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./../context/auth.context";

const API_URI = process.env.REACT_APP_API_URL;


function LoginPage(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    console.log("URIIIII ======>", API_URI)

    axios

      .post(`${API_URI}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        const JWTToken = response.data.authToken;
        logInUser(JWTToken);
        props.history.push("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login-page">
      <h1>Login</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

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
  );
}

export default LoginPage;
