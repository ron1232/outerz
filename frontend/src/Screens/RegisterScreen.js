import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { Form, Field } from 'react-final-form';
import {
  required,
  email,
  composeValidators,
  recordLevel,
} from '../components/common/Validation';
import { renderInput } from '../components/common/Form';

const RegisterScreen = ({ location }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] : '';
  const onSubmit = ({ name, email, password }) => {
    dispatch(register(name, email, password));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Sign Up To OuterZ</h1>
          {error && <Message variant='danger'>{error}</Message>}
          <Form
            onSubmit={onSubmit}
            validate={recordLevel}
            render={({ handleSubmit, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  component={renderInput}
                  name='name'
                  placeholder='Name...'
                  label='Name'
                  validate={required}
                />
                <Field
                  component={renderInput}
                  name='email'
                  placeholder='Email Address...'
                  label='Email Address'
                  validate={composeValidators(required, email)}
                />
                <Field
                  component={renderInput}
                  name='password'
                  placeholder='Password...'
                  label='Password'
                  validate={required}
                  type='password'
                />
                <Field
                  component={renderInput}
                  name='confirmPassword'
                  placeholder='Confirm Password...'
                  label='Confirm Password'
                  validate={required}
                  type='password'
                />
                <Button disabled={invalid} type='submit' variant='primary'>
                  Register
                </Button>
              </form>
            )}
          />
          <Row className='py-3'>
            <Col>
              Already registered?
              <Link
                className='ml-1'
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
              >
                Sign In
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default RegisterScreen;
