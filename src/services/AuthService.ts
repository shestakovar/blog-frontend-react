import { cred_instance, instance } from '../api'
import { IPrintField, IUser } from "../types/types";

interface LoginUser {
    username: string;
    password: string;
}

interface RegisterUser {
   username: string;
   password: string;
   first_name: string;
   last_name: string;
   email: string;
}

export interface SuccessLogin {
  access: string;
  userid: number;
}

export default class AuthService {
    static async login(user: LoginUser) {
        const response = await cred_instance.post<SuccessLogin>(`/token/`, user);
        return response.data;
    }

    static async refresh() {
        const response = await cred_instance.post<SuccessLogin>(`/token/refresh/`);
        return response.data;
    }

    static async logout() {
        const response = await cred_instance.post<void>(`/logout/`);
        return response.data;
    }

    static async register(userobj: IPrintField) {
        const response = await instance.post<IUser>(`/users/`, userobj);
        return response.data;
    }
}
