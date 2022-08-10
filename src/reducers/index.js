import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import polls from "./polls";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  authedUser,
  users,
  polls,
  loadingBar: loadingBarReducer,
});