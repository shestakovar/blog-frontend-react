import { USER_CONSTANTS } from "../constants/user"

export const loginUser = (user) => ({ type: USER_CONSTANTS.LOGIN_USER, payload: user })

export const refreshUser = () => ({ type: USER_CONSTANTS.REFRESH_USER })

export const logoutUser = () => ({ type: USER_CONSTANTS.LOGOUT_USER })
