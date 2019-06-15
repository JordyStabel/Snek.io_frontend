import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authAction";

const AppNavbar = ({ auth: { isAuthenticated }, logout }) => {
  const privateLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/shop" className="nav-link">
          Shop
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/friends" className="nav-link">
          Friends
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/game" className="nav-link">
          Game
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const publicLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
    </ul>
  );

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
          {<Fragment>{isAuthenticated ? privateLinks : publicLinks}</Fragment>}
        </div>
      </div>
    </nav>
  );
};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateProps,
  { logout }
)(AppNavbar);
