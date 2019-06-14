import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-gamepad" /> SnekIO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon" />{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          {
            <Fragment>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lobby" className="nav-link">
                    Lobby
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/social" className="nav-link">
                    Social
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/game" className="nav-link">
                    Game
                  </Link>
                </li>
              </ul>
            </Fragment>
          }
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
