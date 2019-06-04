import { combineReducers } from "redux";

// Custom reducers
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";

// Actual name in the state binded the corresponding reducer
export default combineReducers({
  alert: alertReducer,
  auth: authReducer
});
