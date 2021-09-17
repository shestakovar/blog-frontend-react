import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import PostService from '../services/PostService';
import PostList from '../components/PostList';
import { getPagesCount } from '../utils/pages';
import MyPagination from '../components/UI/MyPagination';
import { useObserver } from '../hooks/useObserver';
import { useFetching } from '../hooks/useFetching';
import LoaderError from '../components/UI/LoaderError';
import { parseLocation } from '../utils/url';


const PostListPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const queryPage = parseInt(parseLocation(location.search, ['page']).page) || 0;
  const author = params.id;
  const [posts, setPosts] = useState([]);
  const [countPages, setCountPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(queryPage);
  const lastElement = useRef();

  const [fetchPosts, isLoading, error] = useFetching(async () => {
    const response = await PostService.getPosts(limit, page, author);
    response.results = response.results.map(post => {
      if (post.content.length > 200)
        post.content = post.content.slice(0, 200) + '...';
      return post;
    })
    setPosts([...posts, ...response.results]);
    const count = response.count;
    setCountPages(getPagesCount(count, limit));
  });

  const changePage = (newpage) => {
    if (page != newpage) {
      setPosts([]);
      setPage(newpage);
    }
    history.push(`/?page=${newpage}`);
  }

  useEffect(() => {
    fetchPosts();
  }, [page])

  useObserver(lastElement, isLoading, page < countPages - 1, () => {
    setPage(page + 1);
  });

  return (
    <Container className="mt-4">
      <MyPagination page={page} countPages={countPages} changePage={changePage} />
      <PostList posts={posts} />
      <LoaderError isLoading={isLoading} error={error} />
      {!error && !posts && <Alert variant="info"> У вас еще нет постов. <Link className="link-dark" to="/posts/add/">Напишите новый!</Link></Alert>}
      <div className="observer" ref={lastElement}></div>
    </Container>
  )
}

export default PostListPage;
