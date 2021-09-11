import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { useFormFetching } from '../hooks/useFormFetching';
import PostService from "../services/PostService";
import LoaderError from './UI/LoaderError';

const PostCommentAddForm = (props) => {
  const [newComment, setNewComment] = useState('');
  const isAuth = useSelector(state => state.isAuth);

  const [addNewComment, isLoading, error, validated] = useFormFetching(async () => {
    const newPushComment = {
      content: newComment,
    };
    let response = await PostService.pushComment(props.postid, newPushComment);
    response = await PostService.getComments(props.postid);
    props.setComments(response);
    setNewComment('');
  })

  return (
    <div className="mt-4">
      <LoaderError isLoading={isLoading} error={error} />
      {isAuth
        ? <Form noValidate validated={validated} className="mt-5" onSubmit={addNewComment}>
          <Form.Group className="mb-3" controlId="postCommentAddForm.ControlTextarea1">
            <Form.Label>Текст комментария</Form.Label>
            <Form.Control required as="textarea" rows={3} value={newComment} onChange={e => setNewComment(e.target.value)} />
            <Form.Control.Feedback type="invalid">Введите текст комментария!</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Добавить комментарий
          </Button>
        </Form>
        : <Alert variant="info" className="mt-4">
          <Alert.Link as={NavLink} to="/login">Войдите</Alert.Link>, чтобы добавить комментарий
        </Alert>
      }
    </div>
  )
}

export default PostCommentAddForm;
