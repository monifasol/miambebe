import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProviderWrapper } from "./context/auth.context"; 
import { CurrentDataProviderWrapper } from "./context/currentData.context"
import { DataboardProviderWrapper } from "./context/databoard.context"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <CurrentDataProviderWrapper>
          <DataboardProviderWrapper>
            <App />
          </DataboardProviderWrapper>
        </CurrentDataProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
