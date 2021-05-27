import React from 'react';
import { Form } from 'react-bootstrap';

export const Input = ({ errorMessage, placeholder, ...props }) => (
  <>
    <Form.Control
      {...props}
      className={errorMessage && 'is-invalid'}
      placeholder={placeholder}
    />
    {errorMessage && (
      <Form.Label className='errorMessage text-danger text-capitalize'>
        {`* ${props.label} ${errorMessage}`}
      </Form.Label>
    )}
  </>
);

export const renderCheckBox = ({ input, meta, label, checked }) => {
  return (
    <Form.Group controlId={input.name}>
      <Form.Check type='checkbox' label={label} checked={checked}></Form.Check>
    </Form.Group>
  );
};

export const renderInput = ({ input, meta, label, placeholder }) => (
  <Form.Group controlId={input.name}>
    <Form.Label>{label}</Form.Label>
    <Input
      {...input}
      label={label}
      errorMessage={meta.touched && meta.error}
      placeholder={placeholder}
    />
  </Form.Group>
);

export const renderSelectOption = ({
  input,
  label,
  defaultValue,
  countries,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='select' {...input}>
        <option>Choose {label}...</option>
        {countries.map((country) => (
          <option
            key={country.name}
            name='country'
            defaultValue={country.name === defaultValue}
          >
            {country.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export const renderSelectOption1 = ({
  input,
  label,
  defaultValue,
  iteration,
  property,
  unique,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='select' {...input}>
        <option>Choose {label}...</option>
        {iteration.map((item, i) => (
          <option key={i} data={i} defaultValue={defaultValue}>
            {item[property]}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};
