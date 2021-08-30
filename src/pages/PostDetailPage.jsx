import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from "../api";
import { Container } from 'react-bootstrap';
import PostDetail from '../components/PostDetail';


const PostDetailPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  async function fetchPost() {
    let response = await api.getPost(params.id);
    setPost(response);
    response = await api.getComments(params.id)
    setComments(response);
  }

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <Container>
      <PostDetail post={post} comments={comments} />
    </Container>
  )
}

export default PostDetailPage;
