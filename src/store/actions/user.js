import { USER_CONSTANTS } from "../constants/user"

export const loginUser = (user, history) => ({ type: USER_CONSTANTS.LOGIN_USER, payload: user, history })

export const setAccessToken = (payload) => ({ type: USER_CONSTANTS.SET_ACCESS_TOKEN, payload })

export const logoutUser = () => ({ type: USER_CONSTANTS.LOGOUT_USER })
