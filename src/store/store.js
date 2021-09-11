import { createStore } from "redux";
import { fillLocalStorage, eraseLocalStorage } from "./localStorage";

const LOGIN = "login"
const LOGOUT = "logout"
const REFRESH = "refresh"


const defaultState = {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    userid: localStorage.getItem('userid'),
    isAuth: false,
};

const refresh = (state, response) => {
    fillLocalStorage(null, response.access, null);
    state = { ...state, token: response.access, isAuth: true };
    return state;
}

const logout = (state) => {
    eraseLocalStorage();
    state = { ...defaultState };
    return state;
}

const login = (state, obj) => {
    if (obj) {
        fillLocalStorage(obj.username, obj.response.access, obj.response.userid);
        state = { ...state, username: obj.username, token: obj.response.access, userid: obj.response.userid, isAuth: true };
    }
    return state;
}


const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return login(state, action.payload);
        case LOGOUT:
            return logout(state);
        case REFRESH:
            return refresh(state, action.payload);
        default:
            return login(state);
    }
}

const store = createStore(reducer);

export default store;

export const loginAction = (payload) => ({ type: LOGIN, payload });
export const logoutAction = (payload) => ({ type: LOGOUT, payload });
export const refreshAction = (payload) => ({ type: REFRESH, payload });
