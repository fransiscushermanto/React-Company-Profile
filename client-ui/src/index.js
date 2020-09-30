import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useHistory } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import Firebase from "./firebase/config";
import { FirebaseContext } from "./firebase/FirebaseContext";

import "./sass/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <HttpsRedirect>
      <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
          <App history={useHistory} />
        </BrowserRouter>
      </FirebaseContext.Provider>
    </HttpsRedirect>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
