import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostService from '../services/PostService';
import { Container } from 'react-bootstrap';
import PostDetail from '../components/PostDetail';


const PostDetailPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchPost() {
    let response = await PostService.getPost(params.id);
    setPost(response);
    response = await PostService.getComments(params.id)
    setComments(response);
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <Container>
      {isLoaded ? <PostDetail post={post} comments={comments} setComments={setComments} /> : ''}
    </Container>
  )
}

export default PostDetailPage;
