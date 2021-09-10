import { instance, auth_instance } from '../api'

export default class PostService {
    static async getPosts(limit = 5, page = 0, author = null) {
        const offset = page * limit;
        const posts = await instance.get(`/posts/`, {
            params: { limit, offset, author }
        });
        return posts.data;
    }

    static async getPost(id) {
        const posts = await instance.get(`/posts/${id}/`);
        return posts.data;
    }

    static async pushPost(post) {
        const response = await auth_instance.post(`/posts/`, post);
        return response.data;
    }

    static async updatePost(postid, newpost) {
        const response = await auth_instance.patch(`/posts/${postid}/`, newpost);
        return response.data;
    }

    static async removePost(postid) {
        const response = await auth_instance.delete(`/posts/${postid}/`);
        return response.data;
    }

    static async getComments(id) {
        const response = await instance.get(`/posts/${id}/comments/`);
        return response.data;
    }

    static async pushComment(id, comment) {
        const response = await auth_instance.post(`/posts/${id}/comments/`, comment);
        return response.data;
    }
}
