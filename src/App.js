
import { useEffect, useState } from "react";
import getPosts from "./api"
import Posts from "./components/Posts";

function App() {
  const [posts, setPosts] = useState([]);


  async function fetchPosts() {
    const response = await getPosts();
    setPosts(response);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div className="App">
      <Posts posts={posts}></Posts>
    </div>
  );
}

export default App;
