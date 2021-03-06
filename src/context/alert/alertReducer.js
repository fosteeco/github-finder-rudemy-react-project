import { SET_ALERT, REMOVE_ALERT } from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload; /* The message and the type  */
    case REMOVE_ALERT:
      return null;
    default:
      return state;
  }
};
