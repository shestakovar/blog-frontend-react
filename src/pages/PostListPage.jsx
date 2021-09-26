import React, { useState } from 'react';
import { useParams } from 'react-router';
import MyPaginationWrapper from "../components/UI/MyPaginationWrapper";
import { useFetching } from "../hooks/useFetching";
import PostService from "../services/PostService";
import { addTags, truncateHtmlString } from "../utils/html";
import { getPagesCount } from "../utils/pages";
import PostList from "../components/PostList";

const PostListPage = () => {
  const params = useParams();
  const author = params.id;

  const [posts, setPosts] = useState([]);
  const [countPages, setCountPages] = useState(0);
  const [limit, setLimit] = useState(5);

  const [fetchPosts, isLoading, error] = useFetching(async (page, localposts) => {
    const response = await PostService.getPosts(limit, page, author);
    response.results = response.results.map(post => {
      const postLen = 400;
      post.content = addTags(post.content);
      if (post.content.length > postLen)
        post.content = truncateHtmlString(post.content, postLen);
      return post;
    })
    setPosts([...localposts, ...response.results]);
    const count = response.count;
    setCountPages(getPagesCount(count, limit));
  });

  const flushPosts = () => {
    setPosts([]);
  }

  return (
    <MyPaginationWrapper
      elements={posts}
      flush={flushPosts}
      countPages={countPages}
      limit={limit}
      fetchElements={fetchPosts}
      isLoading={isLoading}
      error={error}
      children={<PostList posts={posts} />}
      link='/'
      addNew='/posts/add/'
    />
  );
};

export default PostListPage;
