import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap';
import PostService from "../services/PostService";

const PostDetail = (props) => {
  let [newComment, setNewComment] = useState('');

  const addNewComment = async (e) => {
    e.preventDefault();
    const newPushComment = {
      content: newComment,
    };
    let response = await PostService.pushComment(props.post.id, newPushComment);
    response = await PostService.getComments(props.post.id);
    props.setComments(response);
  }

  return (
    <div>
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{props.post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.post.author} {props.post.created}</Card.Subtitle>
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
      <Form className="mt-5">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Текст комментария</Form.Label>
          <Form.Control as="textarea" rows={3} value={newComment} onChange={e => setNewComment(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={addNewComment}>
          Добавить комментарий
        </Button>
      </Form>
    </div>
  )
}

export default PostDetail;
