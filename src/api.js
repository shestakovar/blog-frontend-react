import axios from "axios";
import AuthService from "./services/AuthService";

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
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.access);
            return auth_instance.request(origRequest);
        } catch (e) {
            console.log(e?.response?.data?.detail)
        }
    }
    throw error;
})
