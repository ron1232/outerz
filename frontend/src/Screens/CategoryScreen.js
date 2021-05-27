import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, ListGroup, Row, Form } from 'react-bootstrap';
import {
  listCategoryProducts,
  resetCategoryProducts,
  listCategories,
} from '../actions/categoryActions';
import Message from '../components/Message';
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import { FaSadTear } from 'react-icons/fa';
import PaginateDot from '../components/PaginateDot';

const CategoryScreen = ({ match, location, history }) => {
  const pageNumber = location.search.split('=')[1] || 1;
  const dispatch = useDispatch();
  const categoryProducts = useSelector((state) => state.categoryProducts);
  const { loading, error, result } = categoryProducts;
  const [orderByPrice, setOrderByPrice] = useState('');
  const [categoryPageNumber, setCategoryPageNumber] = useState(1);

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
    pages: categoryPages,
    page: categoryPage,
  } = categoryList;

  const addToCartHandler = (productId) => {
    history.push(`/cart/${productId}?qty=1`);
  };

  useEffect(() => {
    dispatch(listCategoryProducts(match.params.url, pageNumber, orderByPrice));
    dispatch(listCategories(categoryPageNumber));
    return () => {
      dispatch(resetCategoryProducts());
    };
  }, [
    dispatch,
    match.params.url,
    pageNumber,
    orderByPrice,
    categoryPageNumber,
  ]);

  const handleOrderByPrice = ({ target: { value } }) => {
    if (value === '-1') {
      setOrderByPrice('-1');
    }
    if (value === '1') {
      setOrderByPrice('1');
    }
    if (value === '') {
      setOrderByPrice('');
    }
  };
  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <>
          <div className='py-2'>
            <Skeleton height={40} />
          </div>
          <Skeleton height={40} />
          <Row>
            <Col md={3} className='mt-4'>
              <div className='mb-4'>
                <Skeleton height={100} />
              </div>
              <Skeleton height={230} />
            </Col>
            <Col md={9} className='mt-4'>
              <div className='products-loader' style={{ marginTop: '8rem' }}>
                <Loader animation='border' />
              </div>
            </Col>
          </Row>
        </>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col className='mb-1'>
              <Meta title={result.category.title} />
              <h1 className='category-title'>{result.category.title}</h1>
              <h6
                dangerouslySetInnerHTML={{ __html: result.category.article }}
              />
              <hr />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <ListGroup className='mb-4'>
                <ListGroup.Item>
                  <Form.Group controlId='orderByPrice'>
                    <Form.Label>Order By Price</Form.Label>
                    <Form.Control
                      onChange={handleOrderByPrice}
                      as='select'
                      size='sm'
                      value={orderByPrice}
                      custom
                    >
                      <option value=''>.........</option>
                      <option value='-1'>From Highest To Lowest</option>
                      <option value='1'>From Lowest To Highest</option>
                    </Form.Control>
                  </Form.Group>
                </ListGroup.Item>
              </ListGroup>
              {loadingCategories ? (
                <Loader animation='border' />
              ) : errorCategories ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <>
                  <ListGroup className='mb-md-0 mb-4'>
                    <ListGroup.Item className='p-1 text-center'>
                      Categories:
                    </ListGroup.Item>
                    {categories.map((category) => (
                      <ListGroup.Item className='p-1 pl-2' key={category._id}>
                        <Link to={`/category/${category.url}`}>
                          {category.title}
                        </Link>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <PaginateDot
                        pages={categoryPages}
                        page={categoryPage}
                        history={history}
                        changeFunction={setCategoryPageNumber}
                      />
                    </ListGroup.Item>
                  </ListGroup>
                </>
              )}
            </Col>
            <Col md={9}>
              <Row>
                {!result.products.length && (
                  <Col className='text-center'>
                    <i style={{ fontSize: '2.5rem' }}>
                      No Products Found... <FaSadTear />
                    </i>
                  </Col>
                )}
                {result.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                    <Product
                      product={product}
                      addToCartHandler={addToCartHandler}
                    />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={result.pages}
                page={result.page}
                history={history}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CategoryScreen;
