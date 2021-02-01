import UserActionTypes from "./user.types";

export const setCurrentUser = (userAuth) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: userAuth,
});

export const resetCurrentUser = () => ({
	type: UserActionTypes.RESET_CURRENT_USER,
	payload: null,
});
