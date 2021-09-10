import React from 'react'

const PostCommentListItem = ({ comment }) => {
  if (!comment)
    return null;

  return (
    <div>
      <div>{comment.author} {comment.created}</div>
      <div>{comment.content}</div>
    </div>
  )
}

export default PostCommentListItem;
