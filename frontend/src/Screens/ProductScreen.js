import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  resetProductDetails,
  createProductReview,
} from '../actions/productActions';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { withRouter } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';

const ProductScreen = withRouter(({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const { cartItems } = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.url));
    return () => {
      dispatch(resetProductDetails());
    };
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${product._id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(product._id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <>
        <button onClick={() => history.goBack()} className='btn btn-light my-3'>
          Go Back
        </button>
        {loading ? (
          <>
            <Row>
              <Col md={6}>
                <Skeleton height={300} />
              </Col>
              <Col md={3}>
                <Skeleton height={100} />
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={88} />
              </Col>
              <Col md={3}>
                <Skeleton height={300} width={'100%'} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Loader />
            </Row>
          </>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: ${product.price.toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price.toLocaleString()}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock ? `In Stock` : 'Out Of Stock'}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity:</Col>
                          <Col>
                            <strong>{product.countInStock}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              className='qty-select'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      {cartItems.find(
                        (item) => item.product === product._id
                      ) ? (
                        <Button className='btn-block' disabled>
                          Already in cart
                        </Button>
                      ) : (
                        <Button
                          onClick={addToCartHandler}
                          className='btn-block'
                          disabled={product.countInStock === 0}
                          type='button'
                        >
                          Add To Cart
                        </Button>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{moment(review.createdAt).format('LLLL')}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <hr />
                  <ListGroup.Item>
                    <h2>Write a review</h2>
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            onChange={(e) => setRating(e.target.value)}
                            as='select'
                            value={rating}
                          >
                            <option>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - OK</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Great</option>
                            <option value='5'>5 - Excellent!</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                          Submit Review
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>Sign In</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </>
    </>
  );
});

export default ProductScreen;
