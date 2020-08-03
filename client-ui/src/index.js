import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useHistory, Switch, Route } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";

import App from "./components/App";
import Home from "./components/Home/HomeGroup";
import "./sass/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
ReactDOM.render(
  <HttpsRedirect>
    <BrowserRouter>
      <App history={useHistory}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </App>
    </BrowserRouter>
  </HttpsRedirect>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
