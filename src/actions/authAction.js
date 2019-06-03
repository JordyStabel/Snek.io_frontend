import { REGISTER } from "./types";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const register = newUser => async dispatch => {
  const response = await axios.post(
    "http://localhost:8100/user",
    JSON.stringify(newUser),
    config
  );
  dispatch({
    type: REGISTER,
    payload: response.data
  });
};
