
import { useEffect, useState } from "react";
import getPosts from "./api"
import Posts from "./components/Posts";
import { Container } from 'react-bootstrap';
import Header from "./components/Header"

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
      <Header />
      <Container>
        <Posts posts={posts}></Posts>
      </Container>
    </div>
  );
}

export default App;
