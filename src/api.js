import axios from "axios";
import { logoutUser, refreshUser } from "./store/actions/user";

const API_URL = "http://localhost:8000/api"

export const instance = axios.create({
    baseURL: API_URL,
});

export const auth_instance = axios.create({
    baseURL: API_URL,
})

export const cred_instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

auth_instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

auth_instance.interceptors.response.use((config) => { return config }, async (error) => {
    const origRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        origRequest._isRetry = true;
        try {
            await refreshUser();
            return auth_instance.request(origRequest);
        } catch (e) {
            await logoutUser();
            console.log(e?.response?.data?.detail)
        }
    }
    throw error;
})
