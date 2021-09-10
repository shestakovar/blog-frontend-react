import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import PostService from '../services/PostService';
import { useFetching } from '../hooks/useFetching';
import LoaderError from '../components/UI/LoaderError';

const PostCreatePage = () => {
  const [post, setPost] = useState({ title: '', content: '' });
  const history = useHistory();
  const [createPost, isLoading, error] = useFetching(async (event) => {
    event.preventDefault();
    const response = await PostService.pushPost(post);
    history.push(`/${response.id}`);
  })

  return (
    <Container>
      <LoaderError isLoading={isLoading} error={error} />
      <Form className="mt-4" onSubmit={createPost}>
        <Form.Group className="mb-3" controlId="postCreateForm.ControlInput1">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control placeholder="Введите заголовок" value={post.title} onChange={e => { setPost({ ...post, title: e.target.value }) }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postCreateForm.ControlTextarea1">
          <Form.Label>Текст</Form.Label>
          <Form.Control as="textarea" rows={10} value={post.content} onChange={e => { setPost({ ...post, content: e.target.value }) }} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить пост
        </Button>
      </Form>
    </Container>
  )
}

export default PostCreatePage;
