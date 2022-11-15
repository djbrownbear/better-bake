import { RECEIVE_BAKERS } from "../actions/bakers";

export default function bakers(state = {}, action) {
  switch (action.type) {
    case RECEIVE_BAKERS:
      return {
        ...state,
        ...action.bakers,
      };
    default:
      return state;
  };
}