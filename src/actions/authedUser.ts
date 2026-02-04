export const SET_AUTHED_USER = "SET_AUTHED_USER" as const;
export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER" as const;

export function setAuthedUser(id: string) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logoutAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  };
}