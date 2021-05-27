import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { Form, Field } from 'react-final-form';
import { required, signIn } from '../components/common/Validation';
import { renderInput } from '../components/common/Form';

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '';
  const onSubmit = ({ email, password }) => {
    dispatch(login(email, password));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Sign In</h1>
          {error && <Message variant='danger'>{error}</Message>}
          <Form
            onSubmit={onSubmit}
            validate={signIn}
            render={({ handleSubmit, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  component={renderInput}
                  name='email'
                  placeholder='Email...'
                  label='Email Address'
                  validate={required}
                  defaultValue={required}
                />
                <Field
                  component={renderInput}
                  name='password'
                  placeholder='Password...'
                  label='Password'
                  validate={required}
                  type='password'
                />
                <Button disabled={invalid} type='submit' variant='primary'>
                  Login
                </Button>
              </form>
            )}
          />
          <Row className='py-3'>
            <Col>
              New to OuterZ?
              <Link
                className='ml-1'
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default LoginScreen;
