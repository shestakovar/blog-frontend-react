import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Post = (props) => {
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{props.post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.post.author.username}</Card.Subtitle>
        <Card.Text>
          {props.post.content}
        </Card.Text>
        <Card.Link as={Link} to={`${props.post.id}`}>Перейти к посту</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default Post;
