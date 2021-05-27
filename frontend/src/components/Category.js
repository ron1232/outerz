import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Product = ({ category }) => {
  return (
    <>
      <Card
        style={{ maxWidth: '18rem' }}
        className='my-3 p-3 rounded shadow-sm mx-auto'
      >
        <Link to={`/category/${category.url}`}>
          <Card.Img
            className='rounded-sm shadow-sm'
            src={category.image}
            variant='top'
            height='170rem'
          />
        </Link>
        <Card.Body>
          <Card.Title
            className='text-center'
            as='div'
            style={{ height: '1rem' }}
          >
            <Link to={`/category/${category.url}`}>
              <strong>{category.title}</strong>
            </Link>
          </Card.Title>
          <hr />
          <LinkContainer to={`/category/${category.url}`} variant='secondary'>
            <Button className='w-100'>{category.title}</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
