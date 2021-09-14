import { USER_CONSTANTS } from "../constants/user"

export const loginUser = (user, history) => ({ type: USER_CONSTANTS.LOGIN_USER, payload: user, history })

export const refreshUser = () => ({ type: USER_CONSTANTS.REFRESH_USER })

export const logoutUser = () => ({ type: USER_CONSTANTS.LOGOUT_USER })
