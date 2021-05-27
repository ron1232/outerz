import React, { useEffect } from 'react';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  logout,
  updateUserProfile,
} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { Form, Field } from 'react-final-form';
import { required, recordLevel } from '../components/common/Validation';
import { renderInput } from '../components/common/Form';
import { FaTimes } from 'react-icons/fa';
import { AiFillProfile } from 'react-icons/ai';
import { MdReorder } from 'react-icons/md';

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading: loadingUpdate } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const redirect = location.search ? location.search.split('=')[1] : '';

  useEffect(() => {
    if (!error) {
      if (user && !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      }
    }
    if (success) {
      dispatch(logout());
    }
  }, [dispatch, history, redirect, user, error, success]);

  const onSubmit = ({ name, email, password }) => {
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <Row>
      <Col md={6}>
        <h2>
          Profile <AiFillProfile className='mb-1' />
        </h2>
        {success && <Message variant='success'>Profile Updated!</Message>}
        {loadingUpdate && (
          <div>
            <Loader /> <span>Updating your profile</span>
          </div>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          user && (
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
                    defaultValue={user.name}
                  />
                  <Field
                    component={renderInput}
                    name='email'
                    placeholder='Email Address...'
                    label='Email Address'
                    validate={required}
                    defaultValue={user.email}
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
                    Update
                  </Button>
                </form>
              )}
            />
          )
        )}
      </Col>
      <Col md={6}>
        <h2>
          My Orders <MdReorder size={30} />
        </h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes color='red' />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes color='red' />
                    )}
                  </td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
