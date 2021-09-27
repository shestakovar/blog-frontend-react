import React, { useEffect, useState, useRef, FC } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import MyPagination from './MyPagination';
import { useObserver } from '../../hooks/useObserver';
import LoaderError from './LoaderError';
import { parseLocation } from '../../utils/url';

interface props {
  elements: any[];
  flush: () => void;
  countPages: number;
  limit: number;
  fetchElements: (page: number, elements: any[]) => void;
  isLoading: boolean;
  error: string | object | null;
  link: string;
  addNew: string;
}


const MyPaginationWrapper:FC<props> = ({ elements, flush, countPages, limit, fetchElements, isLoading, error, children, link, addNew }) => {
  const location = useLocation();
  const history = useHistory();
  const queryPage = parseInt(parseLocation(location.search, ['page']).page);
  const [page, setPage] = useState(queryPage || 0);
  const lastElement = useRef<HTMLDivElement>(null);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const changePage = (newpage: number) => {
    if (queryPage !== newpage)
      history.push(`${link}?page=${newpage}`);
    else if (newpage !== page) {
      flush();
      setPage(newpage);
    }
  }

  useEffect(() => {
    setIsPageLoading(true);
    if (!isNaN(queryPage)) {
      if (queryPage !== page) {
        flush();
        setPage(queryPage);
      }
    }
    else {
      flush();
      setPage(0);
      fetchElements(page, []);
    }
    setIsPageLoading(false);
  }, [location.search])

  useEffect(() => {
    fetchElements(page, elements);
  }, [page])

  useObserver(lastElement, isLoading || elements.length < limit, page < countPages - 1, () => {
    setPage(page + 1);
  });

  return (
    <Container className="mt-4">
      <MyPagination page={page} countPages={countPages} changePage={changePage} />
      {children}
      <LoaderError isLoading={isLoading} error={error} />
      {!error && elements.length === 0 && !isLoading && !isPageLoading && <Alert variant="info"> У вас еще нет постов. <Link className="link-dark" to={addNew}>Напишите новый!</Link></Alert>}
      <div className="observer" ref={lastElement} />
    </Container>
  )
}

export default MyPaginationWrapper;
