import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Category from '../components/Category';
import { listCategories } from '../actions/categoryActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import { ToastContainer } from 'react-toastify';

const HomeScreen = ({ history, location }) => {
  const pageNumber = location.search.split('=')[1] || 1;

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories, page, pages } = categoryList;
  useEffect(() => {
    dispatch(listCategories(pageNumber));
  }, [dispatch, pageNumber]);
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Meta title='Home' />
      <ProductCarousel />
      <hr />
      <h1 className='text-center'>All Categories:</h1>
      {loading ? (
        <Loader animation='border' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {categories.map((category) => (
              <Col key={category._id} sm={12} md={6} lg={4} xl={3}>
                <Category category={category} />
              </Col>
            ))}
          </Row>
          <hr />
          <div className='d-flex justify-content-center align-items-center'>
            <Paginate pages={pages} page={page} history={history} />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
