import React, { FC } from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TimeString from './UI/TimeString';
import { IComment } from "../types/types";

interface props {
  comment: IComment;
}

const PostCommentListItem: FC<props> = ({ comment }) => {
  if (!comment.content)
    return null;

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title><Link to={`/users/${comment.author_id}`} className="link-dark">{comment.author}</Link></Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><TimeString string={comment.created} /></Card.Subtitle>
        <Card.Text>
          {comment.content}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostCommentListItem;
