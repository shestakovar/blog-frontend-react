import React, { useState, useContext } from 'react'
import { AuthContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import PostService from "../services/PostService";
import LoaderError from './UI/LoaderError';
import { Button, Form, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const PostCommentAddForm = (props) => {
  const [newComment, setNewComment] = useState('');
  const { isAuth } = useContext(AuthContext);

  const [addNewComment, isLoading, error] = useFetching(async (e) => {
    e.preventDefault();
    const newPushComment = {
      content: newComment,
    };
    let response = await PostService.pushComment(props.postid, newPushComment);
    response = await PostService.getComments(props.postid);
    props.setComments(response);
  })

  return (
    <div className="mt-4">
      <LoaderError isLoading={isLoading} error={error} />
      {isAuth
        ? <Form className="mt-5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Текст комментария</Form.Label>
            <Form.Control as="textarea" rows={3} value={newComment} onChange={e => setNewComment(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addNewComment}>
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
