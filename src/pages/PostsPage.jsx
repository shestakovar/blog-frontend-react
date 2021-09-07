import React from 'react';
import { useEffect, useState, useRef } from 'react';
import PostService from '../services/PostService';
import Posts from '../components/Posts';
import { Container } from 'react-bootstrap';
import { getPagesCount } from '../utils/pages';
import MyPagination from '../components/MyPagination';
import { useObserver } from '../hooks/useObserver';


const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countPages, setCountPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [indicatorPage, setIndicatorPage] = useState(0);
  const lastElement = useRef();

  async function fetchPosts() {
    setIsLoading(true);
    const response = await PostService.getPosts(limit, page);
    setPosts([...posts, ...response.results]);
    const count = response.count;
    setCountPages(getPagesCount(count, limit));
    setIsLoading(false);
  }

  const changePage = (page) => {
    setPosts([]);
    setIndicatorPage(page);
    setPage(page);
  }

  useEffect(() => {
    fetchPosts();
  }, [page, indicatorPage])

  useObserver(lastElement, isLoading, page < countPages, () => {
    setPage(page + 1);
  });

  return (
    <Container>
      <Posts posts={posts} />
      {isLoading ? 'Загрузка' : ''}
      <MyPagination page={indicatorPage} countPages={countPages} changePage={changePage} />
      <div className="observer" ref={lastElement}></div>
    </Container>

  )
}

export default PostsPage;
