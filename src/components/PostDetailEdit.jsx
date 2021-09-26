import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import TimeString from './UI/TimeString';
import PostService from '../services/PostService';
import { useFormFetching } from '../hooks/useFormFetching';
import LoaderError from './UI/LoaderError';
import MyEditor from './UI/MyEditor';

const PostDetailEdit = (props) => {
  const [newPostTitle, setNewPostTitle] = useState(props.post.title);
  const [newPostContent, setNewPostContent] = useState(props.post.content);
  const [isInvalid, setIsInvalid] = useState(false);
  const [updatePost, isLoading, error, clearError, validated] = useFormFetching(async () => {
    let response = await PostService.updatePost(props.post.id, { title: newPostTitle, content: newPostContent });
    props.setPost(response);
    props.setEditMode(false);
  })

  useEffect(() => {
    if (newPostContent.trim() === '<p></p>')
      setIsInvalid(true);
  }, [newPostContent])

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
                <Form.Control required value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} />
                <Form.Control.Feedback type="invalid">Введите заголовок!</Form.Control.Feedback>
              </Form.Group>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.post.author} <TimeString string={props.post.created} /></Card.Subtitle>
            <Card.Text>
              <Form.Group className="mb-3" controlId="postDetailEdit.ControlTextarea2">
                <Form.Control isInvalid={validated && isInvalid} as={MyEditor} setPostContent={setNewPostContent} initial={newPostContent} className="form-control" />
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
