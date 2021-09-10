import React from 'react'
import Post from './PostListItem'

const Posts = ({ posts }) => {
  return (
    <div className="posts mt-4">
      {posts.map(post => <Post post={post} key={post.id} />)}
    </div>
  )
}

export default Posts;