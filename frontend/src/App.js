import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ShippingScreen from './Screens/ShippingScreen';
import ProductScreen from './Screens/ProductScreen';
import CategoryScreen from './Screens/CategoryScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import AdminRoute from './components/common/AdminRoute';
import ProtectedRoute from './components/common/ProtectedRoute';
import GuestRoute from './components/common/GuestRoute';
import UserEditScreen from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import CategoryListScreen from './Screens/CategoryListScreen';
import CategoryEditScreen from './Screens/CategoryEditScreen';
import OrderListScreen from './Screens/OrderListScreen';
import SearchScreen from './Screens/SearchScreen';
import NotFoundScreen from './Screens/NotFoundScreen';
import AboutScreen from './Screens/AboutScreen';
import axios from 'axios';
import { logout } from './actions/userActions';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.post('/api/users/check', '', config);
      } catch (error) {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.message === 'Not authorized, token failed'
        ) {
          dispatch(logout());
        }
      }
    };
    checkToken();
  }, [dispatch, userInfo]);
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={HomeScreen} exact />
            <ProtectedRoute path='/shipping' component={ShippingScreen} />
            <ProtectedRoute path='/payment' component={PaymentScreen} />
            <ProtectedRoute path='/placeorder' component={PlaceOrderScreen} />
            <ProtectedRoute path='/profile' component={ProfileScreen} />
            <ProtectedRoute path='/order/:id' component={OrderScreen} />
            <AdminRoute path='/cms/userlist' component={UserListScreen} />
            <AdminRoute path='/cms/user/:id/edit' component={UserEditScreen} />
            <AdminRoute path='/cms/productlist' component={ProductListScreen} />
            <AdminRoute
              path='/cms/product/:id/edit'
              component={ProductEditScreen}
            />
            <AdminRoute
              path='/cms/categorylist'
              component={CategoryListScreen}
            />
            <AdminRoute
              path='/cms/category/:id/edit'
              component={CategoryEditScreen}
            />
            <AdminRoute path='/cms/orderlist' component={OrderListScreen} />
            <GuestRoute path='/login' component={LoginScreen} />
            <GuestRoute path='/register' component={RegisterScreen} />
            <Route path='/product/:url' component={ProductScreen} />
            <Route path='/category/:url' component={CategoryScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/search/:keyword' component={SearchScreen} excat />
            <Route path='/about' component={AboutScreen} />
            <Route path='*' component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
