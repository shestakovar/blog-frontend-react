import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from "../api";
import { Container } from 'react-bootstrap';
import PostDetail from '../components/PostDetail';


const PostDetailPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});

  async function fetchPost() {
    const response = await api.getPost(params.id);
    setPost(response);
  }

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <Container>
      <PostDetail post={post} />
    </Container>
  )
}

export default PostDetailPage;
