import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({
  animation = 'grow',
  variant = 'dark',
  className = '',
  style = '',
}) => {
  return (
    <Spinner
      animation={animation}
      role='status'
      variant={variant}
      style={{ width: '100px', height: '100px', ...style }}
      className={'m-auto d-block' + className}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
