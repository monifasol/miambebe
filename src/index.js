import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { DataProviderWrapper } from "./context/data.context"

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <DataProviderWrapper>
            <App />
        </DataProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
