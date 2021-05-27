import React from 'react';
import { FaLinkedin, FaShoppingBasket, FaCcPaypal } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='section-footer border-top'>
      <div className='container'>
        <section className='footer-top padding-y mt-3'>
          <div className='row'>
            <aside className='col-md-4'>
              <article className='mr-3'>
                <span style={{ fontSize: '2rem' }}>OuterZ</span>{' '}
                <FaShoppingBasket
                  className='ml-1'
                  style={{ marginBottom: '0.97rem' }}
                  size={'2rem'}
                />
              </article>
            </aside>
            <aside className='col-sm-3 col-md-2'>
              <h6 className='title'>About:</h6>
              <ul className='list-unstyled'>
                <li>
                  {' '}
                  <Link to='/about'>About us</Link>
                </li>
              </ul>
            </aside>
            <aside className='col-sm-3 col-md-2'>
              <h6 className='title'>Services:</h6>
              <ul className='list-unstyled'>
                <li>
                  {' '}
                  <span className='fake-a'>Help center</span>
                </li>
                <li>
                  {' '}
                  <span className='fake-a'>Money refund</span>
                </li>
                <li>
                  {' '}
                  <span className='fake-a'>Terms and Policy</span>
                </li>
                <li>
                  {' '}
                  <span className='fake-a'>Open dispute</span>
                </li>
              </ul>
            </aside>
            <aside className='col-sm-3 col-md-2'>
              <h6 className='title'>User:</h6>
              <ul className='list-unstyled'>
                <li>
                  {' '}
                  <Link to='/login'> User Login </Link>
                </li>
                <li>
                  {' '}
                  <Link to='/register'> User Register </Link>
                </li>
                <li>
                  {' '}
                  <Link to='/profile'> Account & Orders </Link>
                </li>
              </ul>
            </aside>
            <aside className='col-sm-2 col-md-2'>
              <h6 className='title'>Contact:</h6>{' '}
              <a
                className='mb-2'
                title='Linkedin'
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.linkedin.com/in/ron-barak/'
                style={{ fontSize: '2rem' }}
              >
                <FaLinkedin color='#2867B2' />
              </a>
            </aside>
          </div>
        </section>
        <section className='footer-copyright border-top'>
          <p className='float-left text-muted'>
            {' '}
            © {new Date().getFullYear()} OuterZ All rights reserved{' '}
          </p>
          <p
            target='_blank'
            rel='noopener noreferrer'
            className='float-right text-muted'
          >
            <a
              href='https://www.paypal.com/'
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaCcPaypal size='1.5rem' color='#0079C1' />
            </a>
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
