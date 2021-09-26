import { auth_instance, instance } from '../api';
import { IUser } from "../types/types";

interface PatchUser {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    last_login?: string | null;
    email?: string;
    date_joined?: string;
    avatar?: string | null;
}

export default class UserService {

    static async getUser(id:number) {
        const posts = await instance.get<IUser>(`/users/${id}/`);
        return posts.data;
    }

    static async patchUser(id:number, userobj: PatchUser) {
        const posts = await auth_instance.patch<IUser>(`/users/${id}/`, userobj);
        return posts.data;
    }
}
