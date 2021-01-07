import React, { FC, Fragment, useContext, useEffect } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import ModalContainer from "../common/modals/ModalContainer";
import Home from "../../features/home/Home";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import CurrentUser from "../../features/user/CurrentUser";
import Dashboard from "../../features/dashboard/Dashboard";
import Settings from "../../features/settings/Settings";
import Test from "../../features/home/Test";

const App: FC<RouteComponentProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    setAppLoaded,
    refreshToken,
    token,
    appLoaded,
  } = rootStore.commonStore;
  const { getUser, getRefreshToken } = rootStore.userStore;
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else if (refreshToken) {
      getRefreshToken(refreshToken);
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, refreshToken, getUser, getRefreshToken, setAppLoaded]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route path="/" exact component={Home} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "2em" }}>
              <Switch>
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/settings" exact component={Settings} />
                <PrivateRoute path="/user" exact component={CurrentUser} />
                <Route path="/test" exact component={Test} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
