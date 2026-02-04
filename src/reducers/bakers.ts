import { RECEIVE_BAKERS } from "../actions/bakers";
import { Baker } from '../types';

interface ReceiveBakersAction {
  type: typeof RECEIVE_BAKERS;
  bakers: Record<string, Baker>;
}

type BakersAction = ReceiveBakersAction;

type BakersState = Record<string, Baker>;

export default function bakers(state: BakersState = {}, action: BakersAction): BakersState {
  switch (action.type) {
    case RECEIVE_BAKERS:
      return {
        ...state,
        ...action.bakers,
      };
    default:
      return state;
  }
}