import React from 'react'
import { Card } from 'react-bootstrap';
import TimeString from './UI/TimeString';

const PostCommentListItem = ({ comment }) => {
  if (!comment)
    return null;

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{comment.author}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><TimeString string={comment.created} /></Card.Subtitle>
        <Card.Text>
          {comment.content}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostCommentListItem;
