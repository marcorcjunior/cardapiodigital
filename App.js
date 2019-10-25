/* @flow */

import React, { useEffect } from "react";

import firebase from "firebase";
import "@firebase/firestore";

import { AppRegistry } from "react-native";
import { Router, Scene } from "react-native-router-flux";
import { Provider } from "./Provider";

import Login from "./src/App/Login";
import Main from "./src/App/DashBoard";
import WebPage from "./src/App/WebPage";

firebase.initializeApp({
  projectId: "cardapiodigital-2c940",
  apiKey: "AIzaSyDMcn2kAeWTlSyXrGPPkpLmbsBuBKxi4mU",
  authDomain: "cardapiodigital-2c940.firebaseapp.com"
});

const App = () => {
  return (
    <Provider>
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} hideNavBar />
          <Scene key="main" component={Main} hideNavBar />
          {/* <Scene
            key="termosUso"
            title="Termos de uso"
            description=""
            url=""
            component={WebPage}
            hideNavBar
          /> */}
        </Scene>
      </Router>
    </Provider>
  );
};

export default App;

AppRegistry.registerComponent("main", () => App);
