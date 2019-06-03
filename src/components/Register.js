import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authAction";
//import { notifyUser } from "../../actions/notifyActions";

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

    const { register } = this.props;
    const { userName, password, repeat, email } = this.state;

    if (password !== repeat) {
      //notifyUser("Passwords do not match", "danger");
      console.log("Passwords do not match");
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
      <div className="row">
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
  register: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default connect(
  null,
  { register }
)(Register);

// ---------- REGISTERING NEW USER ---------- //

// const newUser = {
//   uName: "Henk",
//   password: "password123",
//   email: "test@gmail.com"
// };

// var formBody = [];
// for (var property in newUser) {
//   var encodedKey = encodeURIComponent(property);
//   var encodedValue = encodeURIComponent(newUser[property]);
//   formBody.push(encodedKey + "=" + encodedValue);
// }
// formBody = formBody.join("&");

// fetch("https://example.com/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//   },
//   body: formBody
// });
