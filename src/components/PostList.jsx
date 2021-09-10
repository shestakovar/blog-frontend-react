import React from 'react'
import PostListItem from './PostListItem'

const PostList = ({ posts }) => {
  if (!posts)
    return null;

  return (
    <div className="post_list">
      {posts.map(post => <PostListItem post={post} key={post.id} />)}
    </div>
  )
}

export default PostList;