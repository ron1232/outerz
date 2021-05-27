import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { listCategories } from '../actions/categoryActions';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/cms/productlist');
    } else {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId, 'id'));
        dispatch(listCategories());
      } else {
        setName(product.name);
        setPrice(product.price);
        setUrl(product.url);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [productId, dispatch, successUpdate, history, product]);

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

  const createUrlFromName = (name) => {
    return name.trim().toLowerCase().replace(/\s/g, '-');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let categoryId = '';
    if (typeof category === 'object') {
      categoryId = category._id;
    }

    String(category).includes('Choose') || category === undefined
      ? (categoryId = null)
      : (categoryId = category);

    dispatch(
      updateProduct({
        _id: match.params.id,
        name,
        url,
        price,
        image,
        brand,
        category: categoryId,
        description,
        countInStock,
      })
    );
  };
  return (
    <>
      <Link to='/cms/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={onSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder='Enter name...'
                value={name}
                onBlur={(e) => setUrl(createUrlFromName(e.target.value))}
                type='text'
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='url'>
              <Form.Label>URL</Form.Label>
              <Form.Control
                placeholder='Enter URL...'
                value={url}
                type='text'
                onChange={(e) => setUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder='Enter Price in USD ($)...'
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='image-file'
                name='image'
                label={image}
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                placeholder='Enter Brand...'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                placeholder='Enter Quantity'
                type='number'
                min='0'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {uploading && <Loader />}
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                onChange={(e) => setCategory(e.target.value)}
                value={category && category._id}
              >
                <option>Choose Category...</option>
                {categories &&
                  categories.map((category, i) => (
                    <option key={i} value={category._id}>
                      {category.title}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </Form.Group>
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
