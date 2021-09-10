import React from 'react'
import { Card } from 'react-bootstrap';
import TimeString from './UI/TimeString';

const PostDetail = ({ post }) => {
  if (!post)
    return null;

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{post.author} <TimeString string={post.created} /></Card.Subtitle>
        <Card.Text>
          {post.content}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostDetail;
