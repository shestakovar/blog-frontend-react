import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import TimeString from './UI/TimeString';
import PostService from '../services/PostService';
import { useFetching } from '../hooks/useFetching';
import LoaderError from './UI/LoaderError';

const PostDetailEdit = (props) => {
  const [updatedPost, setUpdatedPost] = useState({ title: props.post.title, content: props.post.content });
  const [updatePost, isLoading, error] = useFetching(async (e) => {
    e.preventDefault();
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
          <Form onSubmit={updatePost}>
            <Card.Title><Form.Control value={updatedPost.title} onChange={e => setUpdatedPost({ ...updatedPost, title: e.target.value })} /></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.post.author} <TimeString string={props.post.created} /></Card.Subtitle>
            <Card.Text><Form.Control as="textarea" rows={3} value={updatedPost.content} onChange={e => setUpdatedPost({ ...updatedPost, content: e.target.value })} /></Card.Text>
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
