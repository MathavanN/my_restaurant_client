/* eslint-disable react/jsx-curly-brace-presence */
import { FC, useContext, useEffect } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
import NavBar from '../../features/nav/NavBar';
import Home from '../../features/home/Home';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import CurrentUser from '../../features/user/CurrentUser';
import Dashboard from '../../features/dashboard/Dashboard';
import Settings from '../../features/settings/Settings';
import ViewPurchaseOrder from '../../features/purchaseOrder/ViewPurchaseOrder';
import OrderMainForm from '../../features/purchaseOrder/OrderMainForm';
import UserDashboard from '../../features/user/UserDashboard';
import GRNDashboard from '../../features/grn/GRNDashboard';
import ViewGRN from '../../features/grn/ViewGRN';
import GRNMainForm from '../../features/grn/GRNMainForm';
import PurchaseOrderDashboard from '../../features/purchaseOrder/PurchaseOrderDashboard';

const App: FC<RouteComponentProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    setAppLoaded,
    refreshToken,
    appLoaded,
    token,
    getToken,
  } = rootStore.commonStore;

  const { getUser, getRefreshToken } = rootStore.userStore;
  useEffect(() => {
    getToken();
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else if (refreshToken && process.env.NODE_ENV === 'development') {
      getRefreshToken(refreshToken);
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getToken, token, refreshToken, getUser, getRefreshToken, setAppLoaded]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;
  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" limit={2} />
      <Route path="/" exact component={Home} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '2em', width: '98%' }}>
              <Switch>
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute
                  path="/purchase"
                  exact
                  component={PurchaseOrderDashboard}
                />
                <PrivateRoute
                  path="/purchase/manage/:id"
                  exact
                  component={OrderMainForm}
                />
                <PrivateRoute
                  path="/purchase/view/:id"
                  exact
                  component={ViewPurchaseOrder}
                />
                <PrivateRoute path="/grn" exact component={GRNDashboard} />
                <PrivateRoute path="/grn/view/:id" exact component={ViewGRN} />
                <PrivateRoute
                  path="/grn/manage/:id"
                  exact
                  component={GRNMainForm}
                />
                <PrivateRoute path="/users" exact component={UserDashboard} />
                <PrivateRoute path="/settings" exact component={Settings} />
                <PrivateRoute path="/user" exact component={CurrentUser} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
