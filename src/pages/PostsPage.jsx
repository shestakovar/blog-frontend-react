import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import PostService from '../services/PostService';
import Posts from '../components/Posts';
import { Container } from 'react-bootstrap';
import { getPagesCount } from '../utils/pages';
import MyPagination from '../components/MyPagination';
import { useObserver } from '../hooks/useObserver';
import { useFetching } from '../hooks/useFetching';
import LoaderError from '../components/LoaderError';


const PostsPage = () => {
  const params = useParams();
  const author = params.id;
  const [posts, setPosts] = useState([]);
  const [countPages, setCountPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [indicatorPage, setIndicatorPage] = useState(0);
  const lastElement = useRef();

  const [fetchPosts, isLoading, error] = useFetching(async () => {
    const response = await PostService.getPosts(limit, page, author);
    setPosts([...posts, ...response.results]);
    const count = response.count;
    setCountPages(getPagesCount(count, limit));
  });

  const changePage = (page) => {
    setPosts([]);
    setIndicatorPage(page);
    setPage(page);
  }

  useEffect(() => {
    fetchPosts();
  }, [page, indicatorPage])

  useObserver(lastElement, isLoading, page < countPages - 1, () => {
    setPage(page + 1);
  });

  return (
    <Container>
      <Posts posts={posts} />
      <LoaderError isLoading={isLoading} error={error} />
      <div className="observer" ref={lastElement}></div>
      <MyPagination page={indicatorPage} countPages={countPages} changePage={changePage} />
    </Container>

  )
}

export default PostsPage;
