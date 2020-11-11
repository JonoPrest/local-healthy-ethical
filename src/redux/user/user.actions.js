import UserActionTypes from "./user.types";

export const setCurrentUser = (userAuth) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: userAuth,
});
