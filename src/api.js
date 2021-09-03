import axios from "axios";

async function getPosts(limit = 5, page = 0) {
    const offset = page * limit;
    const posts = await axios.get(`http://localhost:8000/api/posts/`, {
        params: {
            limit: limit,
            offset: offset,
        }
    });
    return posts.data;
}

async function getPost(id) {
    const posts = await axios.get("http://localhost:8000/api/posts/" + id);
    return posts.data;
}

async function getComments(id) {
    const response = await axios.get(`http://localhost:8000/api/posts/${id}/comments/`);
    return response.data;
}

async function pushComment(id, comment) {
    const response = await axios.post(`http://localhost:8000/api/posts/${id}/comments/`, comment);
    return response.data;
}

const api = { getPosts, getPost, getComments, pushComment }

export default api;
