import { combineReducers } from "@reduxjs/toolkit";
import authedUser from "./authedUser";
import users from "./users";
import polls from "./polls";
import bakers from "./bakers";
import { loadingBarReducer } from "react-redux-loading-bar";

const rootReducer = combineReducers({
  authedUser,
  users,
  polls,
  bakers,
  loadingBar: loadingBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;