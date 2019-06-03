import { combineReducers } from "redux";

// Custom reducers
import authReducer from "./authReducer";

// Actual name in the state binded the corresponding reducer
export default combineReducers({
  auth: authReducer
});
