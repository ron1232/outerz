import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const AdminRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={`/${
              props.location.search ? props.location.search.split('=')[1] : ''
            }`}
          />
        )
      }
    />
  );
};

export default AdminRoute;
