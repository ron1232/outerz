import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { MdAddShoppingCart } from 'react-icons/md';
import Rating from './Rating';

const Product = ({ product, addToCartHandler }) => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Card
      className='p-3 mb-4 rounded mx-auto shadow-sm'
      style={{ maxWidth: '18rem' }}
    >
      <Link to={`/product/${product.url}`}>
        <Card.Img src={product.image} variant='top' height='170rem' />
      </Link>
      <Card.Body>
        <Card.Title as='div' style={{ height: '2rem' }}>
          <Link to={`/product/${product.url}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text as='div' className='d-flex'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h2'>${product.price.toLocaleString()}</Card.Text>
        <Card.Text as='div' className='mt-2'>
          {product.countInStock === 0 ||
          cartItems.find((item) => item.product === product._id) ? (
            <Button disabled className='rounded ml-auto' variant='light'>
              Already in cart
            </Button>
          ) : (
            <Button
              className='rounded-circle ml-auto'
              onClick={() => addToCartHandler(product._id)}
            >
              <MdAddShoppingCart />
            </Button>
          )}
        </Card.Text>
        <Card.Text className='mr-auto' as='div'></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
