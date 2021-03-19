import React, { FC, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import {
  createMuiTheme,
  ThemeProvider,
  Theme,
  responsiveFontSizes,
} from "@material-ui/core";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import Layout from "components/Layout";
import Home from "features/home/Home";
import Counter from "features/counter/Counter";
import ToDoList from "features/todo/ToDoList";
import AddTodo from "features/todo/AddTodo";
import Settings from "features/settings/Settings";
import {
  APP_TITLE,
  PAGE_STOCK_ITEM,
  PAGE_STOCK_TYPE,
  PAGE_TODO_ADD,
  PAGE_UOM,
  PAGE_USER_SIGN_IN,
} from "utils/constants";
import { darkTheme, lightTheme } from "theme/appTheme";
import {
  PAGE_COUNTER,
  PAGE_HOME,
  PAGE_SETTINGS,
  PAGE_TODO,
} from "utils/constants";
import SignIn from "features/user/SignIn";
import {
  currentUserAsync,
  getAppLoaded,
  getUserLoggedIn,
} from "features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "components/PrivateRoute";
import UnitOfMeasure from "features/unitOfMeasure/UnitOfMeasure";
import Loading from "components/Loading";
import StockType from "features/stockType/StockType";
import StockItem from "features/stockItem/StockItem";

const App: FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  useEffect(() => {
    dispatch(currentUserAsync());
  }, [dispatch]);

  const appLoaded = useSelector(getAppLoaded);
  const isLoggedIn = useSelector(getUserLoggedIn);
  if (!appLoaded) return <Loading show={true} />;

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" />
        <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
          <Route path={PAGE_HOME.path} exact component={Home} />
          <Route
            path={"/(.+)"}
            render={() => (
              <Switch>
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_COUNTER.path}
                  exact
                  component={Counter}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_TODO.path}
                  exact
                  component={ToDoList}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_TODO_ADD.path}
                  exact
                  component={AddTodo}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_SETTINGS.path}
                  exact
                  component={Settings}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_UOM.path}
                  exact
                  component={UnitOfMeasure}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_STOCK_TYPE.path}
                  exact
                  component={StockType}
                />
                <PrivateRoute
                  isLoggedIn={isLoggedIn}
                  path={PAGE_STOCK_ITEM.path}
                  exact
                  component={StockItem}
                />
                <Route path={PAGE_USER_SIGN_IN.path} exact component={SignIn} />
              </Switch>
            )}
          />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default withRouter(App);
