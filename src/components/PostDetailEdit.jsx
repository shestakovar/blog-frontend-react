import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import TimeString from './UI/TimeString';
import PostService from '../services/PostService';
import { useFormFetching } from '../hooks/useFormFetching';
import LoaderError from './UI/LoaderError';

const PostDetailEdit = (props) => {
  const [updatedPost, setUpdatedPost] = useState({ title: props.post.title, content: props.post.content });
  const [updatePost, isLoading, error, validated] = useFormFetching(async () => {
    let response = await PostService.updatePost(props.post.id, updatedPost);
    props.setPost(response);
    props.setEditMode(false);
  })

  if (!props?.post)
    return null;

  return (
    <div>
      <LoaderError isLoading={isLoading} error={error} />
      <Card className="my-3">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={updatePost}>
            <Card.Title>
              <Form.Group className="mb-3" controlId="postDetailEdit.ControlTextarea1">
                <Form.Control required value={updatedPost.title} onChange={e => setUpdatedPost({ ...updatedPost, title: e.target.value })} />
                <Form.Control.Feedback type="invalid">Введите заголовок!</Form.Control.Feedback>
              </Form.Group>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.post.author} <TimeString string={props.post.created} /></Card.Subtitle>
            <Card.Text>
              <Form.Group className="mb-3" controlId="postDetailEdit.ControlTextarea2">
                <Form.Control required as="textarea" rows={3} value={updatedPost.content} onChange={e => setUpdatedPost({ ...updatedPost, content: e.target.value })} />
                <Form.Control.Feedback type="invalid">Введите текст поста!</Form.Control.Feedback>
              </Form.Group>
            </Card.Text>
            <Button variant="primary" type="submit">
              Обновить
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PostDetailEdit;
