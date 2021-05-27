import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { PRODUCT_DETAILS_RESET, PRODUCT_CREATE_RESET } from '../constants';
import Paginate from '../components/Paginate';

const ProductListScreen = ({ history, match, location }) => {
  const pageNumber = location.search.split('=')[1] || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_DETAILS_RESET });
    if (successCreate) {
      history.push(`/cms/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch(listProducts('', pageNumber));
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    successDelete,
    successCreate,
    createdProduct,
    history,
    pageNumber,
  ]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  const deleteHandler = (id, name) => {
    confirmAlert({
      title: `Delete product: ${name}?`,
      message: 'Are you sure you want to delete?',
      closeOnEscape: true,
      closeOnClickOutside: true,

      buttons: [
        {
          label: 'OK',
          onClick: () => dispatch(deleteProduct(id)),
        },
        {
          label: 'No',
        },
      ],
    });
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlusCircle /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Quantity</th>
                <th>URL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product._id}>
                  <td>
                    <Link target='_blank' to={`/product/${product.url}`}>
                      {product._id}
                    </Link>
                  </td>
                  <td>
                    <img
                      width='70'
                      alt={product.name}
                      className='rounded'
                      src={product.image}
                      title={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()}</td>
                  <td>
                    {product.category ? (
                      product.category.title
                    ) : (
                      <strong>* No Category *</strong>
                    )}
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.url}</td>
                  <td>
                    <LinkContainer to={`/cms/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      onClick={() => deleteHandler(product._id, product.name)}
                      className='btn-sm ml-1'
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} location={location} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
