import React from 'react';
import Meta from '../components/Meta';
import { FaSadTear } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

const NotFoundScreen = withRouter(({ history }) => {
  return (
    <>
      <button onClick={() => history.goBack()} className='btn btn-light my-3'>
        Go Back
      </button>
      <Meta title='Not Found' />
      <div>
        <h1 className='text-center'>Page Not Found 404</h1>
        <div className='d-flex justify-content-center'>
          <FaSadTear size={40} />
        </div>
      </div>
    </>
  );
});

export default NotFoundScreen;
