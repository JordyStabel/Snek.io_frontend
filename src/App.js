import React from "react";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Custom pages
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Loading from "./components/Loading";

const App = () => {
  //return <LandingPage />;
  return (
    <Provider store={store}>
      <div className="container">
        <LandingPage />
      </div>
    </Provider>
  );
};

export default App;
