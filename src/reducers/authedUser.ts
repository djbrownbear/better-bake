import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from "../actions/authedUser";

interface SetAuthedUserAction {
  type: typeof SET_AUTHED_USER;
  id: string;
}

interface LogoutAuthedUserAction {
  type: typeof LOGOUT_AUTHED_USER;
}

type AuthedUserAction = SetAuthedUserAction | LogoutAuthedUserAction;

export default function authedUser(state: string | null = null, action: AuthedUserAction): string | null {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    case LOGOUT_AUTHED_USER:
      return null;
    default:
      return state;
  }
}