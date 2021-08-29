import axios from "axios";

async function getPosts() {
    const posts = await axios.get("http://localhost:8000/api/posts/");
    return posts.data;
}

export default getPosts;