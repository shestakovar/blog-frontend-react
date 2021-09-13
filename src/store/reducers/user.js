import { USER_CONSTANTS } from "../constants/user";


export const defaultState = {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    userid: localStorage.getItem('userid'),
    isAuth: false,
    loading: false,
    error: null,
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_CONSTANTS.LOGIN_USER_BEGIN:
            return { ...state, loading: true, error: null, isAuth: false };
        case USER_CONSTANTS.LOGIN_USER_SUCCESS:
            return { ...state, username: action.payload.username, token: action.payload.response.access, userid: action.payload.response.userid, isAuth: true, loading: false, error: null };
        case USER_CONSTANTS.LOGIN_USER_FAILURE:
            return { ...state, loading: false, error: action.payload, isAuth: false };

        case USER_CONSTANTS.REFRESH_USER_BEGIN:
            return { ...state, loading: true, error: null };
        case USER_CONSTANTS.REFRESH_USER_SUCCESS:
            return { ...state, token: action.payload.access, isAuth: true };
        case USER_CONSTANTS.REFRESH_USER_FAILURE:
            return { ...state, loading: false, error: action.payload, isAuth: false };

        case USER_CONSTANTS.LOGOUT_USER_BEGIN:
            return { ...state, loading: true, error: null };
        case USER_CONSTANTS.LOGOUT_USER_SUCCESS:
            return { ...defaultState };
        case USER_CONSTANTS.LOGOUT_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
