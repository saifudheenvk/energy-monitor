import { SET_USER_DETAILS } from "../actions/login";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.payload;
    case SET_USER_DETAILS:
        console.log("action.payload", action.payload)
       return action.payload;
    default:
      return "";
  }
};
export default loginReducer;
