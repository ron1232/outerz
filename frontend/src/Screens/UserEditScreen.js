import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form as FormB } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { Form, Field } from 'react-final-form';
import { required, signIn } from '../components/common/Validation';
import { renderInput } from '../components/common/Form';
import { USER_UPDATE_RESET } from '../constants';

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate;
  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/cms/userlist');
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      }
    }
  }, [user, userId, dispatch, success, history]);
  const onSubmit = ({ name, email, isAdmin }) => {
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <>
      <Link to='/cms/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form
            onSubmit={onSubmit}
            validate={signIn}
            render={({ handleSubmit, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  component={renderInput}
                  name='name'
                  placeholder='Name...'
                  label='Name'
                  validate={required}
                  defaultValue={user.name}
                />
                <Field
                  component={renderInput}
                  name='email'
                  placeholder='Email Address...'
                  label='Email Address'
                  defaultValue={user.email}
                  validate={required}
                />
                <FormB.Group>
                  <Field
                    component='input'
                    name='isAdmin'
                    type='checkbox'
                    label='Is Admin'
                    disabled={userInfo._id === user._id}
                    defaultValue={user.isAdmin}
                  />
                  <span className='ml-1'>Is Admin</span>
                </FormB.Group>
                <Button disabled={invalid} type='submit' variant='primary'>
                  Update
                </Button>
              </form>
            )}
          />
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
