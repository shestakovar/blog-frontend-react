import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TimeString from './UI/TimeString';

const PostListItem = ({ post }) => {
  if (!post.content)
    return null;

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{post.author} <TimeString string={post.created} /></Card.Subtitle>
        <Card.Text as="div" className="card_text">
          {post.content.split('\n').map((str, index) => <p key={index}>{str}</p>)}
        </Card.Text>
        <Card.Link as={Link} to={`/${post.id}`}>Перейти к посту</Card.Link>
      </Card.Body>
      <Card.Footer className="text-muted">Комментариев: {post.comment_count}</Card.Footer>
    </Card>
  )
}

export default PostListItem;
