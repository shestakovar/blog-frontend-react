import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostService from '../services/PostService';
import { Container, Button } from 'react-bootstrap';
import PostDetail from '../components/PostDetail';
import { useFetching } from '../hooks/useFetching';
import LoaderError from '../components/UI/LoaderError';
import PostCommentList from '../components/PostCommentList';
import PostCommentAddForm from '../components/PostCommentAddForm';
import PostDetailEdit from '../components/PostDetailEdit';


const PostDetailPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const username = localStorage.getItem('username');
  const [fetchPost, isLoading, error] = useFetching(async () => {
    let response = await PostService.getPost(params.id);
    setPost(response);
    response = await PostService.getComments(params.id)
    setComments(response);
  })

  useEffect(() => {
    fetchPost();
  }, [])

  if (isLoading || error)
    return (
      <LoaderError isLoading={isLoading} error={error} />
    )

  return (
    <Container className="mt-4">
      {editMode
        ? <PostDetailEdit post={post} setPost={setPost} setEditMode={setEditMode} />
        : <React.Fragment>
          <PostDetail post={post} />
          {username === post.author ? <Button onClick={e => setEditMode(!editMode)}>Редактировать</Button> : null}
        </React.Fragment>
      }

      <PostCommentList comments={comments} />
      <PostCommentAddForm postid={post?.id} setComments={setComments} />
    </Container>
  )
}

export default PostDetailPage;
