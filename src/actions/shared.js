import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receivePolls } from "./polls";
import { receiveBakers } from "./bakers";
import { showLoading, hideLoading } from "react-redux-loading-bar";


export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({users, polls, bakers}) => {
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(receiveBakers(bakers));
      dispatch(hideLoading());
    });
  };
}