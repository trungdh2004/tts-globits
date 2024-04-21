import "babel-polyfill";
// import cssVars from "css-vars-ponyfill";

import React from "react";
import ReactDOM from "react-dom";
import "./_index.scss";

//import "bootstrap-css-only/css/bootstrap.min.css";//Remove if not use mdbreact
//import "mdbreact/dist/css/mdb.css";//Remove if not use mdbreact

import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
import UserService from "./app/services/UserService";
import ConstantList from "./app/appConfig";
import HttpService from "app/services/HttpService";
import { store, StoreContext } from "./app/stores";
import "./i18n";
import { ToastContainer } from "react-toastify";
//import '@fortawesome/fontawesome-free/css/all.min.css';

const renderApp = () =>
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>,
    document.getElementById("root")
  );

// for IE-11 support un-comment cssVars() and it's import in this file
// and in EgretTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (ConstantList.AUTH_MODE === "Keycloak") {
  UserService.initKeycloak(renderApp);
} else {
  renderApp();
}
HttpService.configure();
serviceWorker.unregister();
