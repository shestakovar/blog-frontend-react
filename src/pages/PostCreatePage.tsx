import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import PostService from '../services/PostService';
import { useFormFetching } from '../hooks/useFormFetching';
import LoaderError from '../components/UI/LoaderError';
import MyEditor from '../components/UI/MyEditor';

const PostCreatePage: FC = () => {
  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('<p></p>');
  const history = useHistory();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [createPost, isLoading, error, clearError, validated] = useFormFetching(async () => {
    const response = await PostService.pushPost({ title: postTitle, content: postContent });
    history.push(`/${response.id}`);
  })

  useEffect(() => {
    if (postContent.trim() === '<p></p>')
      setIsInvalid(true);
    else
      setIsInvalid(false);
  }, [postContent])

  return (
    <Container>
      <LoaderError isLoading={isLoading} error={error} />
      <Form className="mt-4" noValidate validated={validated} onSubmit={createPost}>
        <Form.Group className="mb-3" controlId="postCreateForm.ControlInput1">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control required placeholder="Введите заголовок" value={postTitle} onChange={e => { setPostTitle(e.target.value) }} />
          <Form.Control.Feedback type="invalid">Введите заголовок!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="postCreateForm.ControlTextarea1">
          <Form.Label>Текст</Form.Label>
          <Form.Control isInvalid={validated && isInvalid} as={MyEditor} setPostContent={setPostContent} className="form-control" />
          <Form.Control.Feedback type="invalid">Введите текст!</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить пост
        </Button>
      </Form>
    </Container>
  )
}

export default PostCreatePage;
