import { LOGIN, REGISTER } from "../actions/types";

const initialState = {
  token: localStorage.getItem("snekio_username"),
  isAuthenticated: null,
  loading: true
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
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
}
