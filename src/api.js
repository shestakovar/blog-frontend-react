import axios from "axios";

async function getPosts() {
    const posts = await axios.get("http://localhost:8000/api/posts/");
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

const api = { getPosts, getPost, getComments }

export default api;
