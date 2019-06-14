import { LOGIN, REGISTER } from "./types";
import axios from "axios";
import { alertUser } from "./alertAction";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const login = (email, password) => async dispatch => {
  const loginCredentials = {
    email,
    password
  };

  try {
    const response = await axios.post(
      "http://localhost:8100/user/login",
      JSON.stringify(loginCredentials),
      config
    );
    dispatch({
      type: LOGIN,
      payload: response.data
    });
  } catch (error) {
    try {
      const response = error.response.data;
      dispatch(
        alertUser(
          response.message,
          response.status === 409 ? "warning" : "danger",
          response.error
        )
      );
    } catch (error) {
      dispatch(
        alertUser("Rest server probaly isn't running.", "danger", "No response")
      );
    }
  }
};

export const register = newUser => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:8100/user/register",
      JSON.stringify(newUser),
      config
    );
    dispatch({
      type: REGISTER,
      payload: response.data
    });
  } catch (error) {
    try {
      const response = error.response.data;
      dispatch(
        alertUser(
          response.message,
          response.status === 409 ? "warning" : "danger",
          response.error
        )
      );
    } catch (error) {
      dispatch(
        alertUser("No response", "danger", "Rest server probaly isn't running.")
      );
    }
  }
};
