import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { alertUser } from "../actions/alertAction";
import { register } from "../actions/authAction";
import LandingPage from "./LandingPage";

class GamePage extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    repeat: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      console.log(nextProps.auth);
      this.props.history.push("/game");
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { register, alertUser } = this.props;
    const { userName, password, repeat, email } = this.state;

    if (password !== repeat) {
      alertUser(
        "Passwords do not match. Please make sure both passwords are identical.",
        "danger",
        "Password error"
      );
    } else {
      register({
        userName,
        email,
        password
      });
    }
  };

  // Redirect as soon as user is authenticated
  // if(isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return <LandingPage />;
  }
}

GamePage.propTypes = {
  alertUser: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { alertUser, register }
)(GamePage);
