import React from 'react'
import PostCommentListItem from './PostCommentListItem';

const PostCommentList = ({ comments }) => {
  if (!comments)
    return null;

  return (
    <div className="post_comment_list mt-4">
      <h2>Комментарии: </h2>
      {comments.map(comm =>
        <PostCommentListItem comment={comm} key={comm.id} />
      )}
    </div>
  )
}

export default PostCommentList;
