import React from 'react'
import { Card } from 'react-bootstrap';

const PostDetail = (props) => {
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{props.post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.post.author}</Card.Subtitle>
        <Card.Text>
          {props.post.content}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostDetail;
