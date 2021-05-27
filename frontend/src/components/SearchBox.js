import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        placeholder='Search Products...'
        className='ml-lg-4 search-box'
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button
        type='submit'
        className='ml-1'
        variant='outline-success'
        style={{ padding: '0.38rem' }}
      >
        GO!
      </Button>
    </Form>
  );
};

export default SearchBox;
