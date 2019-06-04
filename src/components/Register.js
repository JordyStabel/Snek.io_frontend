import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alertUser } from "../actions/alertAction";
import { register } from "../actions/authAction";

class Register extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    repeat: ""
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth) {
    //   console.log(nextProps.auth);
    //   this.props.history.push("/dashboard");
    // }
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

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    required
                    value={this.state.userName}
                    onChange={this.onChange}
                    title="If it doesn't include 69, 420 or at the very least 5 x's, you're never gonna win, just saying"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                    title="Enter a valid unique email address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="repeat">Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="repeat"
                    required
                    value={this.state.repeat}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
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
)(Register);
