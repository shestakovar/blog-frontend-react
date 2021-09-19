import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import PostService from '../services/PostService';
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
  const history = useHistory();
  const username = useSelector(state => state.username);
  const [fetchPost, isLoading, error] = useFetching(async () => {
    let response = await PostService.getPost(params.id);
    setPost(response);
    response = await PostService.getComments(params.id)
    setComments(response);
  })

  const [removePost, isRemoveLoading, removeError] = useFetching(async () => {
    await PostService.removePost(params.id);
    history.goBack();
  })

  useEffect(() => {
    fetchPost();
  }, [])

  if (isLoading || error || !post.content)
    return (
      <LoaderError isLoading={isLoading} error={error} />
    )

  return (
    <Container className="mt-4">
      <LoaderError isLoading={isRemoveLoading} error={removeError} />
      {editMode
        ? <PostDetailEdit post={post} setPost={setPost} setEditMode={setEditMode} />
        : <React.Fragment>
          <PostDetail post={post} />
          {username === post.author
            ? <React.Fragment>
              <Button onClick={e => setEditMode(!editMode)}>Редактировать</Button>
              <Button className="ms-2" variant="danger" onClick={removePost}>Удалить</Button>
            </React.Fragment>
            : null
          }
        </React.Fragment>
      }

      <PostCommentList comments={comments} />
      <PostCommentAddForm postid={post?.id} setComments={setComments} />
    </Container>
  )
}

export default PostDetailPage;
