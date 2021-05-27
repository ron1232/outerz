import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  location,
  changeFunction = () => {},
}) => {
  return (
    pages > 1 && (
      <Pagination className='d-flex justify-content-center align-items-center'>
        {[...Array(pages).keys()].map((x) => (
          <div
            className={`rounded-circle border mx-1 px-2 ${
              x + 1 === page && 'bg-dark'
            }`}
            key={x + 1}
            style={{ fontSize: '1rem', cursor: 'pointer' }}
            to={`?page=${x + 1}`}
            onClick={() => changeFunction(x + 1)}
          >
            <span>⦿</span>
          </div>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
