import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Skeleton from 'react-loading-skeleton';
import { PRODUCT_LIST_RESET } from '../constants';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';

const CategoryScreen = ({ match, location, history }) => {
  const keyword = match.params.keyword;
  const pageNumber = location.search.split('=')[1] || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    return () => {
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <>
          <div className='py-3'>
            <Skeleton height={50} />
          </div>
          <Skeleton height={50} />
          <Row>
            <Col className='mt-4'>
              <Loader animation='border' />
            </Col>
          </Row>
        </>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Search Result For: {keyword}</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      <Paginate pages={pages} page={page} history={history} />
    </>
  );
};

export default CategoryScreen;
