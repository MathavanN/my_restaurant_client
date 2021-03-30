/* eslint-disable react/jsx-curly-brace-presence */
import { ComponentType, FC, useContext } from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Redirect,
  Route,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';

interface IProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<RouteComponentProps<any>>;
}
const PrivateRoute: FC<IProps> = ({ component: Component, ...rest }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
};

export default observer(PrivateRoute);
