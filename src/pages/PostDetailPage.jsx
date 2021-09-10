import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostService from '../services/PostService';
import { Container } from 'react-bootstrap';
import PostDetail from '../components/PostDetail';
import { useFetching } from '../hooks/useFetching';
import LoaderError from '../components/UI/LoaderError';


const PostDetailPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPost, isLoading, error] = useFetching(async () => {
    let response = await PostService.getPost(params.id);
    setPost(response);
    response = await PostService.getComments(params.id)
    setComments(response);
  })

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <Container>
      {!isLoading ? <PostDetail post={post} comments={comments} setComments={setComments} /> : <LoaderError isLoading={isLoading} error={error} />}
    </Container>
  )
}

export default PostDetailPage;
