/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Redirect,
  Route,
} from 'react-router-dom';

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
  isLoggedIn: boolean;
}

const PrivateRoute: FC<IProps> = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

export default PrivateRoute;
