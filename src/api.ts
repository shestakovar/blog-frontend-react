import axios from "axios";
import AuthService from "./services/AuthService";
import { fillLocalStorage } from "./store/localStorage";
import { logoutUser } from "./store/actions/user";
import store from "./store/store"
import { setAccessToken } from "./store/actions/user";

const API_URL = "http://localhost:8000/api";

export const instance = axios.create({
    baseURL: API_URL,
});

export const auth_instance = axios.create({
    baseURL: API_URL,
});

export const cred_instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

auth_instance.interceptors.request.use((config) => {
    const token = store.getState().token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

auth_instance.interceptors.response.use((config) => { return config }, async (error) => {
    const origRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        origRequest._isRetry = true;
        try {
            const response = await AuthService.refresh();
            fillLocalStorage (null, response.access, null);
            store.dispatch(setAccessToken(response.access));
            return auth_instance.request(origRequest);
        }
        catch (e) {
            store.dispatch(logoutUser());
        }
    }
    throw error;
});
