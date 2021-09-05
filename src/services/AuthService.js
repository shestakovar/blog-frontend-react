import { cred_instance } from '../api'

export default class AuthService {
    static async login(username, password) {
        const response = await cred_instance.post(`/token/`, { username, password });
        return response.data;
    }

    static async refresh() {
        const response = await cred_instance.post(`/token/refresh/`);
        return response.data;
    }
}
