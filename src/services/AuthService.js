import { cred_instance, instance } from '../api'

export default class AuthService {
    static async login(username, password) {
        const response = await cred_instance.post(`/token/`, { username, password });
        return response.data;
    }

    static async refresh() {
        const response = await cred_instance.post(`/token/refresh/`);
        return response.data;
    }

    static async logout() {
        const response = await cred_instance.post(`/logout/`);
        return response.data;
    }

    static async register(userobj) {
        const response = await instance.post(`/users/`, userobj);
        return response.data;
    }
}
