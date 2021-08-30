import React from 'react';
import { useEffect, useState } from 'react';
import api from "../api";
import Posts from '../components/Posts';
import { Container } from 'react-bootstrap';


const PostsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchPosts() {
    const response = await api.getPosts();
    setPosts(response);
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const [posts, setPosts] = useState([]);
  return (
    <Container>
      {isLoaded ? <Posts posts={posts}></Posts> : ''}
    </Container>

  )
}

export default PostsPage;
