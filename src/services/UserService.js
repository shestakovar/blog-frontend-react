import { auth_instance } from '../api'

export default class UserService {

    static async getUser(id) {
        const posts = await auth_instance.get(`/users/` + id);
        return posts.data;
    }
}
