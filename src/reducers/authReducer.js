import { LOGIN, LOGOUT, REGISTER } from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem("snekio_username", payload.userName);
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    case LOGOUT:
      localStorage.removeItem("snekio_username");
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
