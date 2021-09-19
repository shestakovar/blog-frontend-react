import AuthService from "../../services/AuthService";
import { excToMessage } from "../../utils/error";
import { USER_CONSTANTS } from "../constants/user";
import { call, put, takeEvery } from "redux-saga/effects"
import { fillLocalStorage, eraseLocalStorage } from "../localStorage";


const loginUserBegin = () => ({ type: USER_CONSTANTS.LOGIN_USER_BEGIN });
const loginUserSuccess = (user) => ({ type: USER_CONSTANTS.LOGIN_USER_SUCCESS, payload: user });
const loginUserFailure = (error) => ({ type: USER_CONSTANTS.LOGIN_USER_FAILURE, payload: error });

const logoutUserBegin = () => ({ type: USER_CONSTANTS.LOGOUT_USER_BEGIN });
const logoutUserSuccess = () => ({ type: USER_CONSTANTS.LOGOUT_USER_SUCCESS });
const logoutUserFailure = (error) => ({ type: USER_CONSTANTS.LOGOUT_USER_FAILURE, payload: error });


function* loginUserWorker(action) {
    try {
        yield put(loginUserBegin());
        const response = yield call(AuthService.login, action.payload);
        yield call(fillLocalStorage, action.payload.username, response.access, response.userid);
        if (action?.history)
            action.history(response);
        yield put(loginUserSuccess({ response, username: action.payload.username }));
    }
    catch (e) {
        yield put(loginUserFailure(excToMessage(e)));
    }
}

function* logoutUserWorker() {
    try {
        yield put(logoutUserBegin());
        yield call(AuthService.logout);
        yield call(eraseLocalStorage);
        yield put(logoutUserSuccess());
    }
    catch (e) {
        yield put(logoutUserFailure(excToMessage(e)));
    }
}

export function* userWatcher() {
    yield takeEvery(USER_CONSTANTS.LOGIN_USER, loginUserWorker);
    yield takeEvery(USER_CONSTANTS.LOGOUT_USER, logoutUserWorker);
}
