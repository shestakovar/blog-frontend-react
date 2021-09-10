import React, { useState, useContext } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap';
import PostService from "../services/PostService";
import { AuthContext } from '../context';
import { NavLink } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import LoaderError from './LoaderError';
import TimeString from './TimeString';

const PostDetail = (props) => {
  let [newComment, setNewComment] = useState('');
  const { isAuth } = useContext(AuthContext);

  const [addNewComment, isLoading, error] = useFetching(async (e) => {
    e.preventDefault();
    const newPushComment = {
      content: newComment,
    };
    let response = await PostService.pushComment(props.post.id, newPushComment);
    response = await PostService.getComments(props.post.id);
    props.setComments(response);
  })

  return (
    <div className="mt-4">
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{props.post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.post.author} <TimeString string={props.post.created} /></Card.Subtitle>
          <Card.Text>
            {props.post.content}
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="mt-5">
        {props.comments.map(comm =>
          <div key={comm.id}>
            <div>{comm.author} {comm.created}</div>
            <div>{comm.content}</div>
          </div>
        )}

      </div>

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

export default PostDetail;
