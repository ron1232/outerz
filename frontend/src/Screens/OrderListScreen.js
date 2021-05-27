import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';
import { ORDER_DETAILS_RESET } from '../constants';
const OrderListScreen = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET });
    dispatch(listOrders());
  }, [dispatch]);
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid?</th>
              <th>Delivered?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{moment(order.createdAt).format('LLLL')}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    moment(order.paidAt).format('LLLL')
                  ) : (
                    <FaTimes color='red' />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    moment(order.deliveredAt).format('LLLL')
                  ) : (
                    <FaTimes color='red' />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
