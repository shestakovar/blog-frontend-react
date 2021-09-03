import React from 'react';
import { useEffect, useState } from 'react';
import api from "../api";
import Posts from '../components/Posts';
import { Container } from 'react-bootstrap';
import { getPagesCount } from '../utils/pages';
import MyPagination from '../components/MyPagination';


const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countPages, setCountPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  async function fetchPosts() {
    const response = await api.getPosts(limit, page);
    setPosts(response.results);
    const posts = response.count;
    setCountPages(getPagesCount(posts, limit));
    setIsLoaded(true);
  }

  const changePage = (page) => {
    setPage(page);
  }

  useEffect(() => {
    fetchPosts();
  }, [page])



  return (
    <Container>
      {isLoaded ? <Posts posts={posts} /> : ''}
      <MyPagination page={page} countPages={countPages} changePage={changePage} />
    </Container>

  )
}

export default PostsPage;
