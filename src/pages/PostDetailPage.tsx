import React, { FC, useEffect, useState } from 'react';
import { useTypedSelector } from "../hooks/useTypedSelector";
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
import { addTags } from '../utils/html';
import { IComment, IPost } from "../types/types";

interface params {
  id: string;
}

const PostDetailPage: FC = () => {
  const params = useParams<params>();
  const postId = parseInt(params.id);
  const [post, setPost] = useState<IPost>({
    id: -1,
    author: '',
    author_id: -1,
    comment_count: -1, title: '', content: '', created: ''});
  const [comments, setComments] = useState<IComment[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const history = useHistory();
  const username = useTypedSelector(state => state.username);
  const [fetchPost, isLoading, error] = useFetching(async () => {
    let response = await PostService.getPost(postId);
    response.content = addTags(response.content);
    setPost(response);
    const response_comments = await PostService.getComments(postId)
    setComments(response_comments);
  })

  const [removePost, isRemoveLoading, removeError] = useFetching(async () => {
    await PostService.removePost(postId);
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
