import React from 'react'
import PostCommentListItem from './PostCommentListItem';

const PostCommentList = ({ comments }) => {
  if (!comments)
    return null;

  return (
    <div className="post_comment_list">
      {comments.map(comm =>
        <PostCommentListItem comment={comm} key={comm.id} />
      )}
    </div>
  )
}

export default PostCommentList;
