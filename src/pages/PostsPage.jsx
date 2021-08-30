import React from 'react';
import { useEffect, useState } from 'react';
import api from "../api";
import Posts from '../components/Posts';
import { Container } from 'react-bootstrap';


const PostsPage = () => {
  async function fetchPosts() {
    const response = await api.getPosts();
    setPosts(response);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const [posts, setPosts] = useState([]);
  return (
    <Container>
      <Posts posts={posts}></Posts>
    </Container>

  )
}

export default PostsPage;
