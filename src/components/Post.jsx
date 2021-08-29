import React from 'react'

const Post = (props) => {
  return (
    <div className="post">
      <div className="post__title">{props.post.title}</div>
      <div className="post__content">{props.post.content}</div>
      <div className="post__author">{props.post.author}</div>
    </div>
  )
}

export default Post;