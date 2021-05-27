import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Meta from '../components/Meta';
import { BsInfoCircle } from 'react-icons/bs';
const HomeScreen = () => {
  return (
    <>
      <Meta title='About Us' />
      <h1 className='text-center'>
        About Us <BsInfoCircle size={30} className='mb-1' />
      </h1>
      <hr />
      <Row>
        <Col className='text-center' style={{ fontSize: '1rem' }}>
          <p>Welcome to OuterZ!</p>
          <p>
            It's good to see you here, and we hope you will join us on our
            journey. <br /> We offer a variety of categories & products.
          </p>
          <p>
            Project was built using the MERN Stack (MongoDB, Express.js, React &
            Node.js). Hope you'll have a great experience, Enjoy!
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <div className='mt-1 mb-1'>
            <img
              src='/images/mern.jpg'
              width='300'
              className='rounded-circle shadow-sm'
              alt='mern'
            />
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className='text-center'>
          <span style={{ fontSize: '1rem' }}>Contact:</span>
          <br />
          <a
            title='Linkedin'
            target='_blank'
            rel='noopener noreferrer'
            className='hover-none'
            href='https://www.linkedin.com/in/ron-barak/'
            style={{ fontSize: '2rem', padding: 0, margin: 0 }}
          >
            <span>Linkedin</span>
          </a>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
