import React from 'react';
import { Field } from 'react-final-form';
import { Form } from 'react-bootstrap';

const FileField = ({ name, label, onChange }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.File
      id='image-file'
      name={name}
      onChange={onChange}
      label={label}
      custom
    ></Form.File>
  </Form.Group>
);

export default FileField;
