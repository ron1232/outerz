import React from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { BiLogOut, BiPaperPlane } from 'react-icons/bi';
import { GrUserAdmin } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { CgUserList } from 'react-icons/cg';
import { RiShoppingBag2Fill, RiFileList3Line } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import SearchBox from './SearchBox';

const Header = ({ history }) => {
  const state = useSelector((state) => [
    state.userLogin.userInfo,
    state.cart.cartItems,
  ]);
  const [userInfo, cartItems] = state;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg='light' collapseOnSelect expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <span style={{ fontSize: '1.35rem' }}>OuterZ</span>{' '}
              <FaShoppingBasket
                className='ml-1'
                style={{ marginBottom: '0.45rem' }}
                size={'1.50rem'}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/about' className='ml-md-1'>
                <Nav.Link>
                  <AiOutlineInfoCircle color='#444' className='mb-1' /> About{' '}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart className='mb-1' /> Cart{' '}
                  {cartItems && cartItems.length > 0 && (
                    <small>({cartItems.reduce((a, c) => a + c.qty, 0)})</small>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <ImProfile className='mb-1' /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <BiLogOut /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser className='mb-1' /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <div className='d-inline'>
                      <GrUserAdmin className='mr-1 mb-1' />
                      CMS
                    </div>
                  }
                  id='adminmenu'
                >
                  <LinkContainer to='/cms/userlist'>
                    <NavDropdown.Item>
                      <CgUserList /> Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/cms/categorylist'>
                    <NavDropdown.Item>
                      <RiFileList3Line /> Categories
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/cms/productlist'>
                    <NavDropdown.Item>
                      <RiShoppingBag2Fill /> Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/cms/orderlist'>
                    <NavDropdown.Item>
                      <BiPaperPlane /> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
