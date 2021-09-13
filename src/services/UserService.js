import { auth_instance, instance } from '../api'

export default class UserService {

    static async getUser(id) {
        const posts = await instance.get(`/users/${id}/`);
        return posts.data;
    }

    static async patchUser(id, userobj) {
        const posts = await auth_instance.patch(`/users/${id}/`, userobj);
        return posts.data;
    }
}
