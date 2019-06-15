import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Custom pages
import Alert from "./components/Alert";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import MainPage from "./components/mainpage/MainPage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="app">
            <Navbar />
            <div className="container-fluid" id="main-container">
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: "5"
                }}
              >
                <Alert
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                />
              </div>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/game" component={LandingPage} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
