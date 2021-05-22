import { FC } from 'react';
import { RouteProps, Redirect, Route } from 'react-router-dom';

export type ProtectedRouteProps = {
  isLoggedIn: boolean;
} & RouteProps;

const PrivateRoute: FC<ProtectedRouteProps> = ({ isLoggedIn, ...rest }) => (
  <> {isLoggedIn ? <Route {...rest} /> : <Redirect to="/" />}</>
);

export default PrivateRoute;
