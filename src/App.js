import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Custom pages
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Loading from "./components/Loading";
import MainPage from "./components/MainPage";

const App = () => {
  //return <LandingPage />;
  return (
    <Provider store={store}>
      <Router>
        <div className="container-fluid">
          <MainPage />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
