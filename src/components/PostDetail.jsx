import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TimeString from './UI/TimeString';

const PostDetail = ({ post }) => {
  if (!post.content)
    return null;

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><Link to={`/users/${post.author_id}`} className="link-dark">{post.author}</Link> <TimeString string={post.created} /></Card.Subtitle>
        <Card.Text as="div">
          {post.content.split('\n').map((str, index) => <p key={index}>{str}</p>)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostDetail;
