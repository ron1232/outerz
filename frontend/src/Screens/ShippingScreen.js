import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Field } from 'react-final-form';
import {
  required,
  recordLevel,
  country,
} from '../components/common/Validation';
import { renderInput, renderSelectOption } from '../components/common/Form';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from 'axios';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const [countries, setCountries] = useState([]);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const onSubmit = ({ address, city, postalCode, country }) => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${window.location.protocol}//restcountries.eu/rest/v2/all`
      );
      setCountries(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form
          onSubmit={onSubmit}
          validate={recordLevel}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Field
                component={renderInput}
                name='address'
                placeholder='Address...'
                label='Address'
                validate={required}
                defaultValue={shippingAddress.address}
              />
              <Field
                component={renderInput}
                name='city'
                placeholder='City...'
                label='City'
                validate={required}
                defaultValue={shippingAddress.city}
              />
              <Field
                component={renderInput}
                name='postalCode'
                placeholder='postalCode...'
                label='Postal Code'
                validate={required}
                defaultValue={shippingAddress.postalCode}
              />
              <Field
                component={renderSelectOption}
                name='country'
                label='Country'
                countries={countries}
                defaultValue={shippingAddress.country || 'Choose Country...'}
                validate={country}
              />
              <Button disabled={invalid} type='submit' variant='primary'>
                Continue
              </Button>
            </form>
          )}
        />
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
