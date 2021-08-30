import axios from "axios";

async function getPosts() {
    const posts = await axios.get("http://localhost:8000/api/posts/");
    return posts.data;
}

async function getPost(id) {
    const posts = await axios.get("http://localhost:8000/api/posts/" + id);
    return posts.data;
}

const api = { getPosts, getPost }

export default api;
