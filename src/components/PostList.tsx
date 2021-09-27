import React, { FC } from 'react'
import PostListItem from './PostListItem'
import { IPost } from "../types/types";

interface props {
  posts: IPost[];
}

const PostList: FC<props> = ({ posts }) => {
  if (!posts)
    return null;

  return (
    <div className="post_list">
      {posts.map(post => <PostListItem post={post} key={post.id} />)}
    </div>
  )
}

export default PostList;
