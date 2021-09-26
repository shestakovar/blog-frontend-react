import { instance, auth_instance } from '../api'
import { IComment, IPost } from "../types/types";

interface postObj {
    title: string;
    content: string;
}

export default class PostService {
    static async getPosts(limit:number = 5, page:number = 0, author:number|null = null) {
        const offset = page * limit;
        const posts = await instance.get(`/posts/`, {
            params: { limit, offset, author }
        });
        return posts.data;
    }

    static async getPost(id:number) {
        const posts = await instance.get<IPost>(`/posts/${id}/`);
        return posts.data;
    }

    static async pushPost(post: postObj) {
        const response = await auth_instance.post<IPost>(`/posts/`, post);
        return response.data;
    }

    static async updatePost(postid: number, newpost: postObj) {
        const response = await auth_instance.patch<IPost>(`/posts/${postid}/`, newpost);
        return response.data;
    }

    static async removePost(postid: number) {
        const response = await auth_instance.delete(`/posts/${postid}/`);
        return response.data;
    }

    static async getComments(id: number) {
        const response = await instance.get<IComment[]>(`/posts/${id}/comments/`);
        return response.data;
    }

    static async pushComment(id: number, comment: {content: string}) {
        const response = await auth_instance.post<IComment>(`/posts/${id}/comments/`, comment);
        return response.data;
    }
}
