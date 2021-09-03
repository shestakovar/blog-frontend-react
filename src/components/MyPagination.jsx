import React from 'react'
import { Pagination } from 'react-bootstrap';

const MyPagination = ({page=0, countPages, changePage}) => {
  const active = page + 1;
  let items = [];
  for (let number = 1; number <= countPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => changePage(number - 1)}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination>{items}</Pagination>
  )
}

export default MyPagination;