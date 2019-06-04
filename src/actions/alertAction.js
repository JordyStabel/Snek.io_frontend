import { ALERT_USER, REMOVE_ALERT } from "../actions/types";
import uuid from "uuid";

// Generate a custom alert object with a message and messageType
export const alertUser = (
  message,
  messageType,
  reason,
  timeout = 5000
) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: ALERT_USER,
    payload: { message, messageType, reason, id }
  });

  // Remove the alert after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
