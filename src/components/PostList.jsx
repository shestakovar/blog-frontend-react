import React from 'react'
import PostListItem from './PostListItem'

const PostList = ({ posts }) => {
  return (
    <div className="posts mt-4">
      {posts.map(post => <PostListItem post={post} key={post.id} />)}
    </div>
  )
}

export default PostList;