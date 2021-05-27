import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listCategories,
  deleteCategory,
  createCategory,
} from '../actions/categoryActions';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import { CATEGORY_CREATE_RESET, CATEGORY_DETAILS_RESET } from '../constants';
import { Link } from 'react-router-dom';
import Paginate from '../components/Paginate';

const CategoryListScreen = ({ history, match, location }) => {
  const pageNumber = location.search.split('=')[1] || 1;

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories, page, pages } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = categoryDelete;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    category: createdCategory,
  } = categoryCreate;

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });
    dispatch({ type: CATEGORY_DETAILS_RESET });
    if (successCreate) {
      history.push(`/cms/category/${createdCategory._id}/edit`);
    }
    if (successDelete) {
      dispatch(listCategories(pageNumber));
    } else {
      dispatch(listCategories(pageNumber));
    }
  }, [
    dispatch,
    history,
    successCreate,
    successDelete,
    createdCategory,
    pageNumber,
  ]);

  const createCategoryHandler = () => {
    dispatch(createCategory());
  };
  const deleteHandler = (id, name) => {
    confirmAlert({
      title: `Delete category: ${name}?`,
      message: 'Are you sure you want to delete?',
      closeOnEscape: true,
      closeOnClickOutside: true,

      buttons: [
        {
          label: 'OK',
          onClick: () => dispatch(deleteCategory(id)),
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
          <h1>Categories</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCategoryHandler}>
            <FaPlusCircle /> Create Category
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
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Article</th>
              <th>URL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => (
              <tr key={category._id}>
                <td>
                  <Link to={`/category/${category.url}`} target='_blank'>
                    {category._id}
                  </Link>
                </td>
                <td>
                  <img
                    width='70'
                    alt={category.title}
                    className='rounded'
                    src={category.image}
                    title={category.title}
                  />
                </td>
                <td>{category.title}</td>
                <td dangerouslySetInnerHTML={{ __html: category.title }} />
                <td>{category.url}</td>
                <td>
                  <LinkContainer to={`/cms/category/${category._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    onClick={() => deleteHandler(category._id, category.title)}
                    className='btn-sm ml-1'
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate page={page} pages={pages} location={location} />
    </>
  );
};

export default CategoryListScreen;
