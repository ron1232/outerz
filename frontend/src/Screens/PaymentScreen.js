import React, { useEffect, useState } from 'react';
import { Button, Form as FormB, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
// import { Form, Field } from 'react-final-form';
// import { required, recordLevel } from '../components/common/Validation';
// import { renderInput } from '../components/common/Form';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  useEffect(() => {});
  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <form onSubmit={onSubmit}>
          <FormB.Group>
            <FormB.Label>Select Method</FormB.Label>
            <Col>
              <FormB.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></FormB.Check>
            </Col>
          </FormB.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
