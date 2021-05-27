import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listCategoryDetails,
  updateCategory,
} from '../actions/categoryActions';
import FormContainer from '../components/FormContainer';
import { CATEGORY_UPDATE_RESET } from '../constants';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProductEditScreen = ({ history, match }) => {
  const categoryId = match.params.id;
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState(0);
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push('/cms/categorylist');
    } else {
      if (!category || category._id !== categoryId) {
        dispatch(listCategoryDetails(categoryId));
      } else {
        setTitle(category.title);
        setArticle(category.article);
        setUrl(category.url);
        setImage(category.image);
      }
    }
  }, [categoryId, dispatch, successUpdate, history, category]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const createUrlFromTitle = (title) => {
    return title.trim().toLowerCase().replace(/\s/g, '-');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: match.params.id,
        title,
        article,
        url,
        image,
      })
    );
  };
  return (
    <>
      <Link to='/cms/categorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Category</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={onSubmit}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder='Enter title...'
                value={title}
                type='text'
                onBlur={(e) => setUrl(createUrlFromTitle(e.target.value))}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='url'>
              <Form.Label>URL</Form.Label>
              <Form.Control
                placeholder='Enter Url...'
                value={url}
                type='text'
                onChange={(e) => setUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Article</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={article}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setArticle(data);
                }}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='image-file'
                name='image'
                label={image.split('/uploads\\')}
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>
            {uploading && <Loader />}
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
